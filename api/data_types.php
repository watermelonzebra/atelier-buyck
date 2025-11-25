<?php

// =========================================================================
// Data Types and Validation
// =========================================================================

/**
 * Defines the required and optional fields for the contact form data,
 * mirroring the ContactFormData interface in route.ts.
 */
class ContactFormData
{
    public string $first_name;
    public string $last_name;
    public string $email;
    public string $message;
    public ?string $phone;
    public ?string $website; // Honeypot field
}

/**
 * Validates the raw input data.
 * This mirrors the validation logic in route.ts.
 *
 * @param array $data The decoded JSON data.
 * @return ContactFormData|array Returns the valid data object or an error array.
 */
function validate_contact_data(array $data): ContactFormData|array
{
    $errors = [];

    // --- Required Field Checks ---
    $required_fields = ['first_name', 'last_name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            $errors[] = ucfirst(str_replace('_', ' ', $field)) . ' is required.';
        }
    }

    // --- Email Validation ---
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email format.';
    }

    // --- Honeypot Check (Website field must be empty) ---
    // If a bot fills this, it indicates spam.
    if (!empty($data['website'])) {
        // Log this or handle silently, but don't process the request.
        return ['success' => false, 'message' => 'Spam detected (honeypot field filled).'];
    }

    if (!empty($errors)) {
        return ['success' => false, 'message' => 'Validation failed.', 'errors' => $errors];
    }

    // Map and sanitize data to the object
    $contactData = new ContactFormData();
    $contactData->first_name = filter_var($data['first_name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $contactData->last_name = filter_var($data['last_name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $contactData->email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $contactData->message = filter_var($data['message'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $contactData->phone = filter_var($data['phone'] ?? null, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $contactData->website = null; // Always null since it must be empty

    return $contactData;
}
?>