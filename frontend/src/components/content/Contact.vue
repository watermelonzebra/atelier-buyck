<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
<template>
    <article class="contact" id="contact">
        <div class="contact__wrapper">
            <div class="contact__content">
                <h2>Maatwerk Interieur Project Starten? Vraag Advies.</h2>
                <p>Bent u op zoek naar een unieke schrijnwerk oplossing? Wij helpen u graag verder met het ontwerpen en
                    realiseren van uw droom interieur op maat.</p>
            </div>
            <form action="submitForm" class="contact__form">
                <div class="contact__form-row">
                    <label for="website">
                        <input id="website" type="text" name="website" placeholder="Uw website">
                        <span>website</span>
                    </label>
                </div>
                <div class="contact__form-row">
                    <label for="first_name">
                        <input id="first_name" type="text" name="first_name" placeholder="Voornaam" required>
                        <span>Voornaam</span>
                    </label>
                    <label for="last_name">
                        <input id="last_name" type="text" name="last_name" placeholder="Achternaam" required>
                        <span>Achternaam</span>
                    </label>
                </div>
                <div class="contact__form-row">
                    <label for="telephone">
                        <input id="telephone" type="text" name="telephone" placeholder="Telefoon (optioneel)">
                        <span>Telefoon (optioneel)</span>
                    </label>
                    <label for="email">
                        <input id="email" type="email" name="email" placeholder="Email" required>
                        <span>Email</span>
                    </label>
                </div>
                <div class="contact__form-submit">
                    <label for="message">
                        <textarea id="message" name="message" rows="5" placeholder="Uw bericht" required></textarea>
                        <span>Uw bericht</span>
                    </label>
                    <button class="contact__form-button" type="submit">
                        <span>Uw project bespreken</span>
                    </button>
                </div>
                <p>By submitting this form, you agree that we may use your information to contact you regarding your
                    inquiry, as described in our
                    <RouterLink :to="{ name: 'PrivacyPolicy' }">Privacy Policy</RouterLink>
                </p>
            </form>
            <div id="circle-stroke">
            </div>
        </div>
    </article>
</template>
<style lang="scss" scoped>
.contact {
    overflow: hidden;
    width: 100dvw;

    display: flex;
    align-items: center;
    justify-content: center;

}

.contact__wrapper {
    width: 100%;
    height: 100%;

    position: relative;
    padding: var(--spacing-xxxl) var(--spacing-s) var(--spacing-xxxl) var(--spacing-s);

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: var(--spacing-xxl);



    max-width: 132rem;

    @media screen and (min-width: 500px) {
        padding: var(--spacing-xxxl) var(--spacing-l);
    }

    @media screen and (min-width: 1150px) {
        grid-template-columns: 52rem 1fr;
        grid-template-rows: auto;
        padding: 12.4rem var(--spacing-xxl) 22.5rem var(--spacing-xxl);
    }
}

#circle-stroke {
    position: absolute;
    left: -28rem;
    bottom: -20rem;
    z-index: -1;

    border-radius: 100%;

    width: 60rem;
    height: 60rem;

    max-width: 124rem;
    max-height: 124rem;

    border: var(--main) solid calc(60rem/6);

    @media screen and (min-width: 1000px) {
        width: 124rem;
        height: 124rem;
        border: var(--main) solid calc(124rem/6);

        top: 41.5%;
        left: -20rem
    }
}

.contact__content {
    max-width: 54rem;
}

.contact__form {
    display: flex;
    flex-flow: column;
    gap: var(--spacing-xs);

    max-width: 72rem;
    margin-left: auto;

    @media screen and (min-width: 1150px) {
        margin-top: 14.3rem;
    }
}

.contact__form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xs);
}

.contact__form-submit {
    display: grid;
    grid-template-rows: 20rem 1fr;
    gap: var(--spacing-xs);

    width: 100%;

    @media screen and (min-width: 600px) {
        grid-template-rows: 20rem;
        grid-template-columns: auto 20rem;
    }
}

label {
    display: inline-block;
    position: relative;
    height: 4.7rem;

    span {
        opacity: 0;
    }
}

input,
textarea {
    background-color: var(--main-lightest);
    border: none;

    height: 100%;
    width: 100%;
    padding: var(--spacing-s) var(--spacing-l);
}

textarea {
    height: 20rem;
    resize: none;
}

.contact__form-button {
    width: 20rem;
    padding: var(--spacing-xs) var(--spacing-l);
    margin: 0 auto;
    border-radius: 10rem;

    border: none;
    background-color: var(--main-dark);
    color: var(--white);

    font-weight: bold;

    cursor: pointer;

    transition: all 0.75s cubic-bezier(1, -0.3, 0.1, 1);

    >span {
        transition: font-size 0.75s cubic-bezier(1, -0.3, 0.1, 1);
    }

    &:hover {
        transform: scale(1.2);

        >span {
            font-size: 1.35rem;
        }
    }
}
</style>