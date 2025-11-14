<script setup lang="ts"></script>
<template>
    <section class="cookie-policy">
        <h2>Cookie Policy for Atelier Buyck</h2>
        <p><strong>Effective Date:</strong> [Date of Publication]</p>

        <p>
            This Cookie Policy explains what cookies are, how Atelier Buyck
            <a href="https://www.atelierbuyck.be" _blank>(https://www.atelierbuyck.be)</a>
            uses them, and your choices regarding their use.
        </p>
        <article>
            <h3>1. What Are Cookies?</h3>
            <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                They are widely used to make websites work, or to work more efficiently, as well as to provide
                information
                to the owners of the site.
            </p>
        </article>
        <article>
            <h3>2. How We Use Cookies</h3>
            <p>We use cookies for the following purposes:</p>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Purpose</th>
                            <th>Type</th>
                            <th>Third-Party Access</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Strictly Necessary</td>
                            <td>Essential for navigating the site and using its features (e.g., remembering your cookie
                                preference).
                            </td>
                            <td>First-Party, Session/Persistent</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <td>Analytics/Performance</td>
                            <td>To analyze how visitors use our website and monitor its performance. This helps us
                                improve
                                the
                                user
                                experience.</td>
                            <td>Third-Party (Google Analytics)</td>
                            <td>Yes (Google)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
        <article>
            <h3>3. Details of Analytics Cookies</h3>
            <ul>
                <li>
                    <p>
                        <strong>Provider:</strong>
                        <span>Google Analytics</span>
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Purpose:</strong>
                        <span>
                            Collects anonymous information about website traffic, pages visited, and time spent on the
                            site.
                            This data is processed to understand website performance.
                        </span>
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Data Collected:</strong>
                        <span>
                            IP address (anonymized/pseudonymized where possible), technical data (browser type, device
                            type), usage data.
                        </span>
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Requirement:</strong>
                        <span>
                            As these are not strictly necessary, they are only set <strong>after</strong> you
                            have provided explicit consent via our cookie banner.
                        </span>
                    </p>
                </li>
            </ul>
        </article>
        <article>
            <h3>4. Your Consent and Choices (GDPR/ePrivacy Compliance)</h3>
            <p>
                Under Belgian law and the GDPR, we are required to obtain your explicit consent before placing
                non-essential cookies (like Google Analytics) on your device.
            </p>
            <ul>
                <li>
                    <p>When you first visit our site, a <strong>Cookie Banner</strong> allows you to:</p>
                    <ul>
                        <li>
                            <p><strong>Accept All</strong> (including Analytics cookies)</p>
                        </li>
                        <li>
                            <p><strong>Reject All</strong> (except strictly necessary cookies)</p>
                        </li>
                    </ul>
                </li>
                <li>
                    <p>
                        <strong>Withdrawing Consent:</strong> You can change or withdraw your consent at any time via
                        the [Link to Cookie
                        Settings/Preference Center] on our website, or by deleting cookies through your browser
                        settings.
                    </p>
                </li>
            </ul>
        </article>
    </section>
</template>
<style lang="scss" scoped>
.cookie-policy {
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
    width: 100%;
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