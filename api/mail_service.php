<?php

// Note: This file relies on the PHPMailer classes being included in send_mail.php
// and the configuration constants (SMTP_HOST, etc.) from config.php.

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Configures the common SMTP settings for a PHPMailer instance.
 *
 * @param PHPMailer $mail The PHPMailer instance to configure.
 */
function configure_smtp(PHPMailer $mail, string|null $email, string|null $name): void
{

    // Server settings
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port       = SMTP_PORT;
    $mail->setFrom($email ? $email : SMTP_FROM_EMAIL, $name ? $name : SMTP_FROM_NAME);
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8'; // Ensure correct handling of special characters
}

/**
 * Sends the contact form submission to the business recipient.
 *
 * @throws Exception If the mail fails to send.
 */
function send_business_email(string $first_name, string $last_name, string $email, string $message, ?string $phone): void
{

    $name = $first_name . ' ' . $last_name;

    $mail = new PHPMailer(true);
    configure_smtp($mail, $email, $name);

    // Recipient: The business owner
    $mail->addAddress(BUSINESS_RECIPIENT_EMAIL, BUSINESS_RECIPIENT_NAME);
    $mail->Subject = 'Nieuw bericht van de website: ' . $name;

    // Content (Uses templates defined in email_templates.php)
    $mail->Body    = generate_business_html_body($first_name, $last_name, $email, $message, $phone);
    $mail->AltBody = generate_business_text_body($first_name, $last_name, $email, $message, $phone);

    $mail->send();
}

/**
 * Sends a confirmation email back to the client/user who submitted the form.
 *
 * @throws Exception If the mail fails to send.
 */
function send_client_email(string $first_name, string $last_name, string $email, string $message, ?string $phone): void
{
    $mail = new PHPMailer(true);
    configure_smtp($mail, null, null);

    // Recipient: The client (sender of the form)
    $mail->addAddress($email, $first_name . ' ' . $last_name);
    $mail->Subject = 'Bevestiging van uw bericht aan Atelier Buyck';

    // Content (Uses templates defined in email_templates.php)
    $mail->Body    = generate_client_html_body($first_name, $last_name, $email, $message, $phone);
    $mail->AltBody = generate_client_text_body($first_name, $last_name, $email, $message, $phone);

    $mail->send();
}
