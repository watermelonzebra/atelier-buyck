<?php

// =========================================================================
// HTML Body Generation for Business Recipient
// =========================================================================

function generate_business_html_body(string $first_name, string $last_name, string $email, string $message, ?string $phone): string
{
    $phone_html = $phone ? "<p><strong>Telefoon:</strong> {$phone}</p>" : '';
    return "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <h2>Nieuwe Contactaanvraag</h2>
        <p>U heeft een nieuw bericht ontvangen via het contactformulier op de website:</p>
        <p><strong>Naam:</strong> {$first_name} {$last_name}</p>
        <p><strong>E-mail:</strong> {$email}</p>
        {$phone_html}
        <p><strong>Bericht:</strong></p>
        <div style='border: 1px solid #eee; padding: 15px; margin-top: 10px; background-color: #f9f9f9;'>
            " . nl2br(htmlspecialchars($message)) . "
        </div>
        <hr style='margin-top: 20px;'>
        <p style='font-size: 12px; color: #777;'>Dit is een automatisch bericht. Gelieve hierop niet te antwoorden.</p>
        </body>
        </html>
    ";
}

function generate_business_text_body(string $first_name, string $last_name, string $email, string $message, ?string $phone): string
{
    $phone_text = $phone ? "Telefoon: {$phone}\n" : '';
    return "NIEUW BERICHT VAN HET CONTACT FORMULIER\n\n" .
        "Naam: {$first_name} {$last_name}\n" .
        "E-mail: {$email}\n" .
        $phone_text .
        "Bericht:\n" . $message . "\n\n" .
        "--- Dit is een automatisch bericht. Gelieve hierop niet te antwoorden. ---";
}

// =========================================================================
// HTML Body Generation for Client Recipient (Confirmation)
// =========================================================================

function generate_client_html_body(string $first_name, string $last_name, string $email, string $message, ?string $phone): string
{
    $phone_html = $phone ? "<p><strong>Uw Telefoon:</strong> {$phone}</p>" : '';
    return "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <h2>Bevestiging van uw bericht aan Atelier Buyck</h2>
        <p>Beste {$first_name},</p>
        <p>We hebben uw bericht goed ontvangen en nemen zo spoedig mogelijk contact met u op. Hieronder vindt u een kopie van uw inzending:</p>
        <p><strong>Uw E-mail:</strong> {$email}</p>
        {$phone_html}
        <p><strong>Uw Bericht:</strong></p>
        <div style='border: 1px solid #eee; padding: 15px; margin-top: 10px; background-color: #f9f9f9;'>
            " . nl2br(htmlspecialchars($message)) . "
        </div>
        <hr style='margin-top: 20px;'>
        <p style='font-size: 12px; color: #777;'>Dit is een automatisch bericht. Gelieve hierop niet te antwoorden.</p>
        </body>
        </html>
    ";
}

function generate_client_text_body(string $first_name, string $last_name, string $email, string $message, ?string $phone): string
{
    $phone_text = $phone ? "Telefoon: {$phone}\n" : '';
    return "Uw Bericht aan Atelier Buyck\n\n" .
        "We hebben uw bericht goed ontvangen. Hier is een kopie van uw inzending:\n\n" .
        "Naam: {$first_name} {$last_name}\n" .
        "E-mail: {$email}\n" .
        $phone_text .
        "Uw Bericht:\n" . $message . "\n\n" .
        "--- Dit is een automatisch bericht. Gelieve hierop niet te antwoorden. ---";
}
