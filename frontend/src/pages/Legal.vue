<script lang="ts" setup>
import { useHead } from "@vueuse/head";

// add page title to the current document title
useHead({
  title: "Legal Notice & Terms of Use | Atelier Buyck",
  meta: [
    {
      name: "description",
      content:
        "Read the legal notice and terms of use for Atelier Buyck website. Understand your rights and responsibilities when using our digital business card platform.",
    },
  ],
});
</script>
<template>
  <section class="legal-page">
    <h2>Legal Notice & Terms of Use</h2>
    <p><strong>Effective Date:</strong> [Date of Publication]</p>

    <article>
      <h3>1. Governing Law</h3>
      <p>
        These Terms of Use and your use of the website are governed by the laws
        of <strong>Belgium.</strong>
      </p>
    </article>
    <article>
      <h3>2. Website Purpose (Digital Business Card)</h3>
      <p>
        The website https://www.atelierbuyck.be is intended purely as a digital
        business card and is for
        <strong>informational purposes only</strong>. It presents information
        about <strong>Atelier Buyck</strong> and its services. No services,
        contracts, or sales transactions are concluded directly through this
        website.
      </p>
    </article>
    <article>
      <h3>3. Intellectual Property Rights</h3>
      <p>
        All content, text, graphics, logos, and images on this website are the
        property of <strong>Atelier Buyck</strong> or its content suppliers and
        are protected by Belgian and international copyright laws. You may not
        copy, reproduce, or distribute any content without our prior written
        consent.
      </p>
    </article>
    <article>
      <h3>4. Limitation of Liability and Disclaimer</h3>
      <p>
        The information on this website is provided "as is," without any
        warranties of any kind.
      </p>
      <ul>
        <li>
          <p>
            <strong>Atelier Buyck</strong> does not warrant the completeness,
            reliability, or accuracy of the content. Your reliance on the
            information is strictly at your own risk.
          </p>
        </li>
        <li>
          <strong>
            To the fullest extent permitted by law, Atelier Buyck will not be
            liable for any direct, indirect, or consequential loss or damage
            arising out of or in connection with the use or inability to use the
            website or its content.
          </strong>
        </li>
        <li>
          <p>
            <strong>Force Majeure:</strong> We are not liable for any failure to
            perform, or delay in performance of, any of our obligations that is
            caused by events outside our reasonable control.
          </p>
        </li>
      </ul>
    </article>
    <article>
      <h3>5. Links to Third-Party Websites</h3>
      <p>
        The website may contain links to third-party websites or resources
        (e.g., social media pages).
      </p>
      <ul>
        <li>
          <p>These links are provided for your convenience only.</p>
        </li>
        <li>
          <p>
            <strong>
              Atelier Buyck has no control over the contents of those sites or
              resources and accepts no responsibility for them or for any loss
              or damage that may arise from your use of them.
            </strong>
            Accessing any third-party websites linked to this website is done
            entirely at your own risk and subject to the terms and conditions of
            use for such websites.
          </p>
        </li>
      </ul>
    </article>
  </section>
</template>
<style lang="scss" scoped>
.legal-page {
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
