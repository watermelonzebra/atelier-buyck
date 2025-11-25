<?php

// =========================================================================
// 0. Configuration and Dependency Loading
// =========================================================================
// IMPORTANT: Ensure there is absolutely NO whitespace or blank lines
// before this opening '<?php' tag.

// --- Core Dependency Loading (PHPMailer Fix) ---
// The error indicates that a PHPMailer class constant is being used in config.php
// before the PHPMailer classes are loaded. We must load these first.
// NOTE: Adjust these paths if your PHPMailer files are located elsewhere!
require_once 'src/Exception.php';
require_once 'src/PHPMailer.php';
require_once 'src/SMTP.php';

// Load configuration constants (API_KEY, ALLOWED_ORIGINS, SMTP details)
require_once 'config.php';
require_once 'data_types.php';
require_once 'mail_service.php';
require_once 'email_templates.php';

// --- Helper Functions ---

/**
 * Sets the necessary CORS headers based on the request origin and allowed list.
 */
function set_cors_headers(): void
{
    // These constants are now loaded from config.php
    global $ALLOWED_ORIGINS;
    $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
    $allowed = in_array('*', ALLOWED_ORIGINS) || ($origin && in_array($origin, ALLOWED_ORIGINS));

    if ($allowed && $origin) {
        // Set the specific origin if it was sent and is allowed
        header('Access-Control-Allow-Origin: ' . $origin);
    } elseif (in_array('*', ALLOWED_ORIGINS)) {
        // Fallback for cases where '*' is used but origin is not set (e.g., curl)
        header('Access-Control-Allow-Origin: *');
    }

    // Headers required for preflight (OPTIONS)
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    // Important: Include all custom headers your client sends
    header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
    header('Access-Control-Max-Age: 86400'); // Cache preflight for 24 hours
}

/**
 * Sends a clean JSON response and terminates the script.
 */
function send_json_response(bool $success, string $message, int $status_code): void
{
    http_response_code($status_code);
    header('Content-Type: application/json');
    echo json_encode(['success' => $success, 'message' => $message]);
    exit();
}


// =========================================================================
// 1. CORE LOGIC START (CORS, METHOD, AUTH)
// =========================================================================

// Set CORS header for ALL requests (OPTIONS will exit, POST will continue)
set_cors_headers();

// Handle the preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(); // Terminate after sending headers
}

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json_response(false, 'Method not allowed.', 405);
}

// --- API Key Authentication ---
$apiKeyHeader = $_SERVER['HTTP_X_API_KEY'] ?? null;

if (empty($apiKeyHeader) || $apiKeyHeader !== API_KEY) {
    send_json_response(false, 'Unauthorized: Invalid or missing API key.', 401);
}


// =========================================================================
// 2. Data Processing and Validation
// =========================================================================

// Require the PHPMailer library use statements after all includes are done
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Get the raw POST data
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if (!$data) {
    send_json_response(false, 'Invalid JSON body.', 400);
}

// --- Data Validation ---
$validation_result = validate_contact_data($data);

if (is_array($validation_result)) {
    // Check for honeypot (which returns success=false but message=Spam detected)
    if (isset($validation_result['message']) && strpos($validation_result['message'], 'Spam') !== false) {
        // Return 200 OK to the client to mask the detection, but log the event.
        error_log("Spam detected from IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'));
        send_json_response(true, 'Submission processed (Spam detected).', 200);
    }
    // Return validation errors
    send_json_response(false, $validation_result['message'], 400);
}

// The result is a valid ContactFormData object
/** @var ContactFormData $contactData */
$contactData = $validation_result;

// =========================================================================
// 3. Send Email
// =========================================================================
try {
    // Send the email to the business
    send_business_email(
        $contactData->first_name,
        $contactData->last_name,
        $contactData->email,
        $contactData->message,
        $contactData->phone
    );

    // Send the confirmation email to the client
    send_client_email(
        $contactData->first_name,
        $contactData->last_name,
        $contactData->email,
        $contactData->message,
        $contactData->phone
    );

    send_json_response(true, 'Message sent successfully. Thank you!', 200);
} catch (Exception $e) {
    // Log the detailed error but send a generic message back to the client
    error_log("PHPMailer Error: " . $e->getMessage());
    send_json_response(false, 'Failed to send message due to a server error.', 500);
}
