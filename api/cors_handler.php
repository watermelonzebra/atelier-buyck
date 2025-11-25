<?php

// =========================================================================
// CORS Handling
// =========================================================================

// Ensure configuration is loaded
if (!defined('ALLOWED_ORIGINS')) {
    require_once 'config.php';
}

/**
 * Generates the appropriate CORS headers based on the requested origin.
 *
 * @param string|null $origin The origin from the request header (e.g., https://yourdomain.com).
 * @return array Associative array of CORS headers.
 */
function get_cors_headers(?string $origin = null): array
{
    $allowed_origins = ALLOWED_ORIGINS;
    $allow_all = in_array('*', $allowed_origins);

    $allow_origin = '';

    if ($allow_all) {
        // If '*' is allowed, use the requesting origin or '*' as a fallback.
        // This is necessary because ACAO:* often doesn't work with credentialed requests,
        // but since we aren't using credentials, setting it to the requesting origin is safest.
        $allow_origin = $origin ?? '*';
    } else {
        // Check if the origin is in the allowed list.
        $is_allowed = $origin && in_array($origin, $allowed_origins);
        if ($is_allowed) {
            $allow_origin = $origin;
        } else {
            // If origin is not allowed, do not return any ACAO header or return an empty string.
            // Returning an empty string prevents the header from being sent entirely.
            $allow_origin = '';
        }
    }

    // Set the headers
    return [
        'Access-Control-Allow-Origin' => $allow_origin,
        'Access-Control-Allow-Methods' => 'POST, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, X-API-Key',
        'Access-Control-Max-Age' => '86400', // 24 hours
    ];
}

/**
 * Applies CORS headers to the response and handles the OPTIONS preflight request.
 *
 * @return bool True if the script should terminate (OPTIONS request handled), false otherwise.
 */
function handle_cors_preflight(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? null;
    $headers = get_cors_headers($origin);

    // Apply headers for all requests
    foreach ($headers as $key => $value) {
        if ($key === 'Access-Control-Allow-Origin' && $value === '') {
            // If the origin is explicitly disallowed, we deliberately skip setting this header
            // to signal that the origin is not allowed, which correctly blocks the request.
            continue;
        }
        // Use `header_remove` to ensure we aren't duplicating headers, then set it.
        header_remove($key);
        header("{$key}: {$value}");
    }

    // Handle OPTIONS preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // If the origin was disallowed, the ACAO header was skipped, which is correct.
        http_response_code(200);
        exit();
    }

    // If the Access-Control-Allow-Origin header was not set (i.e., origin was disallowed),
    // we terminate the POST request with an unauthorized status.
    if (!array_key_exists('Access-Control-Allow-Origin', $headers) || empty($headers['Access-Control-Allow-Origin'])) {
        // Note: If you have configured '*' in config.php, this block will never be hit.
        // This is a safety for specific origin lists.
        http_response_code(403);
        send_json_response(false, 'Forbidden: Origin is not allowed.', 403);
        exit();
    }


    return false;
}

// Helper to send a clean JSON response (copied from send_mail.php to avoid dependency loop)
function send_json_response(bool $success, string $message, int $httpCode = 200, array $extra = []): void
{
    // The main script should set the headers, but ensure clean exit here.
    http_response_code($httpCode);
    header('Content-Type: application/json');
    echo json_encode(array_merge(['success' => $success, 'message' => $message], $extra));
    exit();
}
