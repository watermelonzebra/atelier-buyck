<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({
    title: 'Privacy Policy | Atelier Buyck',
    meta: [
        {
            name: 'title',
            content: 'Privacy Policy | Atelier Buyck',
        },
        {
            name: 'description',
            content: 'Lees onze privacyverklaring om te begrijpen hoe Atelier Buyck uw persoonlijke gegevens verzamelt, gebruikt en beschermt in overeenstemming met de AVG.',
        },
    ],
})
</script>
<template>
    <section class="privacy-policy">
        <h2>Privacy Policy for Atelier Buyck</h2>
        <p><strong>Effective Date:</strong> [Date of Publication]</p>

        <article>
            <h3>1. Data Controller Contact Information (Article 13 GDPR)</h3>
            <ul>
                <li>
                    <p>
                        <strong>Data Controller:</strong> Atelier Buyck
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Address:</strong> [Your Full Address]
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Email for Privacy Matters:</strong> [Your Designated Privacy Email]
                    </p>
                </li>
            </ul>
        </article>
        <article>
            <h3>2. Personal Data We Collect and Why</h3>
            <p>We collect personal data based on your specific actions on the website, as detailed below:</p>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Source of Data</th>
                            <th>Categories of Personal Data Collected</th>
                            <th>Purpose of Processing</th>
                            <th>Lawful Basis (GDPR Article 6)</th>
                            <th>Retention Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Contact Form</td>
                            <td>Full Name, Email Address, Phone Number (if provided), Message Content.</td>
                            <td>To respond to your query and communicate with you about your request.</td>
                            <td>Legitimate Interest (Responding to user inquiries) or Consent (if required by the form
                                design).</td>
                            <td>Up to [e.g., 12 months] after the inquiry is resolved, unless a business relationship is
                                established.</td>
                        </tr>
                        <tr>
                            <td>Google Analytics</td>
                            <td>IP Address (anonymized/pseudonymized), Device/Browser Type, Pages Visited, Time Spent.
                            </td>
                            <td>To analyze website performance and user behavior to improve the website's design and
                                functionality.</td>
                            <td>Consent (Obtained via the Cookie Banner).</td>
                            <td>[e.g., 26 months] as set in Google Analytics, then aggregated/deleted.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
        <article>
            <h3>3. How We Collect Data (Article 14 GDPR)</h3>
            <ul>
                <li>
                    <p>
                        <strong>Directly from You:</strong>
                        When you manually fill out and submit the Contact Form.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Automatically:</strong>
                        Through Google Analytics cookies (as detailed in our Cookie Policy) after you have given your
                        consent.
                    </p>
                </li>
            </ul>
        </article>
        <article>
            <h3>4. Data Sharing (Article 13 GDPR)</h3>
            <strong>
                Atelier Buyck does not share or sell your personal data to third parties for marketing or advertising
                purposes.
            </strong>
            <ul>
                <li>
                    <p>
                        <strong>Data Processors:</strong>
                        We share minimal data with trusted third parties who act as
                        <strong>Data Processors</strong>
                        on our behalf:
                    </p>
                    <ul>
                        <li>
                            <p>
                                <strong>Google (Google Analytics):</strong>
                                Processes website usage data to provide us with performance reports. We have a Data
                                Processing Agreement (DPA) in place with Google.
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>[Your Website Host/Email Provider]:</strong>
                                Handles the data storage and transmission for the website and contact form.
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>
        <article>
            <h3>5. Data Security (Article 32 GDPR)</h3>
            <p>
                We implement appropriate technical and organizational measures to ensure a level of security appropriate
                to the risk, including:
            </p>
            <ul>
                <li>
                    <p>
                        Use of <strong>SSL/TLS encryption</strong> for data transmission (HTTPS).
                    </p>
                </li>
                <li>
                    <p>
                        Access controls to limit who can access contact form submissions.
                    </p>
                </li>
            </ul>
        </article>
        <article>
            <h3>6. Your GDPR Data Subject Rights (Articles 15-22)</h3>
            <p>As a data subject in the EU/Belgium, you have the following rights regarding the personal data we hold
                about you:</p>
            <ul>
                <li>
                    <p><strong>Right to be Informed</strong> (this Policy).</p>
                </li>
                <li>
                    <p><strong>Right of Access.</strong></p>
                </li>
                <li>
                    <p><strong>Right to Rectification</strong>(correction of data).</p>
                </li>
                <li>
                    <p><strong> Right to Erasure</strong>('Right to be Forgotten').</p>
                </li>
                <li>
                    <p><strong>Right to Restrict Processing.</strong></p>
                </li>
                <li>
                    <p><strong>Right to Data Portability.</strong></p>
                </li>
                <li>
                    <p><strong>Right to Object to processing.</strong></p>
                </li>
                <li>
                    <p><strong>Right to Withdraw Consent</strong> (where consent is the basis for processing).</p>
                </li>
            </ul>
            <p> To exercise any of these rights, please contact us at the designated email address in Section 1.</p>
        </article>
    </section>
</template>
<style lang="scss" scoped>
.privacy-policy {
    max-width: 65rem;
    margin: 0 auto;
    margin-top: var(--spacing-xxxl);
    margin-bottom: var(--spacing-xxl);

    padding: 0 var(--spacing-s);

    article {
        margin-top: var(--spacing-xl);
    }
}

.table-container {
    overflow-x: auto;
}

table {
    overflow-x: auto;
    border-collapse: collapse;
    margin-top: var(--spacing-m);

    th,
    td {
        border: 1px solid var(--main);
        padding: var(--spacing-s);
        text-align: left;
    }

    th {
        background-color: var(--main-lightest);
    }
}
</style>