<?php

// =========================================================================
// Configuration Settings
// =========================================================================

// --- Security ---
// The secret key expected in the X-API-Key header.
// NOTE: In a production environment, this should be loaded from a secure
// environment variable (e.g., getenv('API_KEY')).
define('API_KEY', 'zlwsspvPaBVZHLFoDu2YNIfRkeYzeGep6mzfMDfWCrcTluEL5zUHy1C9mdO0PX5taKadFe344t2aCSxYyi7e3igIfWppDGYIsj8RmWTfha8zehbYqQl43iG5szMLlGjE');

// --- CORS Configuration ---
// Define allowed origins. Use '*' for all (not recommended for production).
// In a real application, you might load this from a .env file.
const ALLOWED_ORIGINS = ['http://localhost:5173'];

// --- Email Recipients & Sender ---
// The email address that receives the contact form submissions (the business).
const BUSINESS_RECIPIENT_EMAIL = 'info@trustthebelly.be';
const BUSINESS_RECIPIENT_NAME = 'Simon Buyck';

// The 'From' address for all outgoing emails. This MUST be an address
// configured on your SMTP server for successful delivery.
const SMTP_FROM_EMAIL = 'noreply@trustthebelly.be';
const SMTP_FROM_NAME = 'Trust The Belly';

// --- SMTP Settings (PHPMailer Configuration) ---
const SMTP_HOST = 'mail.trustthebelly.be';
const SMTP_USERNAME = 'info@trustthebelly.be';
const SMTP_PASSWORD = 'KMei9WgZp3TDZ!p1';
const SMTP_PORT = 465;
// PHPMailer::ENCRYPTION_SMTPS corresponds to SMTPS (port 465)
const SMTP_SECURE = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;

// --- PHPMailer Library Includes ---
// Adjust paths as necessary for your setup.
const PHPMailer_INCLUDES = [
    'src/Exception.php',
    'src/PHPMailer.php',
    'src/SMTP.php'
];
