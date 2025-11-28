<?php

// =========================================================================
// HTML Body Generation for Business Recipient
// =========================================================================

function generate_business_html_body(string $first_name, string $last_name, string $email, string $message, ?string $phone): string
{
    $phone_html = $phone ? "<p><strong>Telefoon:</strong> {$phone}</p>" : '';
    return "
        <html>
          <head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
            <link
              href='https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap'
              rel='stylesheet'
            />
          </head>
          <body
            style='
              font-family: Raleway, Arial, sans-serif;
              line-height: 1.6;
              color: #5c3c3b;
              background-color: #f9f9f9;
            '
          >
            <div style='max-width: 600px; margin: 0 auto'>
              <h1 style='text-transform: uppercase; font-weight: bold'>
                Nieuwe Contactaanvraag
              </h1>
              <hr style='margin-top: 20px; color: #366c6c' />
              <p>
                U heeft een nieuw bericht ontvangen via het contactformulier op de
                website:
              </p>
              <div
                style='
                  background-color: #f5f5ec;
                  padding: 20px;
                  border-radius: 5px;
                  margin: 20px 0;
                '
              >
                <p><strong>Naam:</strong> {$first_name} {$last_name}</p>
                <p><strong>E-mail:</strong> {$email}</p>
                {$phone_html}
                <p><strong>Bericht:</strong></p>
                <div
                  style='
                    margin: 10px 0;
                    white-space: pre-wrap;
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-left: 3px solid #366c6c;
                  '
                >
                  ' . nl2br(htmlspecialchars($message)) . '
                </div>
              </div>
            </div>
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
          <head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
            <link
              href='https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap'
              rel='stylesheet'
            />
          </head>
          <body
            style='
              font-family: Raleway, Arial, sans-serif;
              line-height: 1.6;
              color: #5c3c3b;
              background-color: #f9f9f9;
            '
          >
            <div style='max-width: 600px; margin: 0 auto'>
              <h1 style='text-transform: uppercase; font-weight: bold'>
                Bevestiging van uw bericht aan Atelier Buyck
              </h1>
              <hr style='margin-top: 20px; color: #366c6c' />
              <p>Beste {$first_name},</p>
              <p>
                We hebben uw bericht goed ontvangen en nemen zo spoedig mogelijk contact
                met u op. Hieronder vindt u een kopie van uw inzending:
              </p>
              <div
                style='
                  background-color: #f5f5ec;
                  padding: 20px;
                  border-radius: 5px;
                  margin: 20px 0;
                '
              >
                <p><strong>Uw E-mail:</strong> {$email}</p>
                {$phone_html}
                <p><strong>Uw Bericht:</strong></p>
                <div
                  style='
                    margin: 10px 0;
                    white-space: pre-wrap;
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-left: 3px solid #366c6c;
                  '
                >
                  ' . nl2br(htmlspecialchars($message)) . '
                </div>
              </div>
              <hr style='margin-top: 20px' />
              <p style='font-size: 12px; color: #366c6c'>
                Dit is een automatisch bericht. Gelieve hierop niet te antwoorden.
              </p>
            </div>
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
