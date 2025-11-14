<script lang="ts" setup>
import { computed } from 'vue';


const shouldShowBanner = computed(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');

    if (cookieConsent === 'accepted' || cookieConsent === 'declined') {
        return false
    }

    return true
})

function acceptCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    window.location.reload();
}

function declineCookies() {
    localStorage.setItem('cookie-consent', 'declined');
    window.location.reload();
}
</script>
<template>
    <div v-if="shouldShowBanner" class="cookie-banner">
        <p>
            We use tracking cookies to understand how you use the product
            and help us improve it.
            Please accept cookies to help us improve.
        </p>
        <div class="cookie-banner__actions">
            <button type="button" class="accept" @click="acceptCookies">Accept All</button>
            <button type="button" @click="declineCookies">Reject All</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--main-lightest);
    padding: var(--spacing-m);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 1000;

    p {
        margin: 0 0 var(--spacing-s) 0;
        font-size: 1.4rem;
    }

    &__actions {
        display: flex;
        gap: var(--spacing-s);

        button {
            background-color: var(--main-lightest);
            color: inherit;
            border: solid 2px var(--main);
            padding: var(--spacing-s) var(--spacing-m);
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 4px;

            transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);

            &.accept {
                border: solid 2px var(--main-dark);
                background-color: var(--main-dark);
                color: var(--main-lightest);

                &:hover {
                    background-color: transparent;
                    color: var(--main-darkest);
                }
            }

            &:hover {
                background-color: var(--main);
                color: var(--main-lightest);
            }
        }
    }
}
</style>