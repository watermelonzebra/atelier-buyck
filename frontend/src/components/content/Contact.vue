<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import { type PageSettings } from "../../resources/interfaces/sanity.types";
import {
  getSanityImageSrcSet,
  getSanityImageUrl,
  sizes,
} from "../../helpers/sanity-image.helper";

defineProps<{
  isPage: Boolean;
  contactData: PageSettings["contactData"] | null;
}>();

const loading = ref(false);
const message = ref<{ key: "succes" | "error"; value: string }>();

const mailData = reactive(
  {} as {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    message: string;
    website: string; // honeypot
  }
);

const API_KEY = import.meta.env.VITE_APP_MAIL_API_KEY;

const handleSubmit = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  message.value = undefined;

  try {
    const res = await axios.post(
      import.meta.env.VITE_APP_MAIL_API_URL,
      mailData,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
      }
    );
    console.log(res);
    if (res.data.success) {
      message.value = { key: "succes", value: res.data.message };
    } else {
      message.value = {
        key: "error",
        value: res.data.message || "Er ging iets mis.",
      };
    }
  } catch (err: any) {
    message.value = {
      key: "error",
      value: err.response?.data?.message || "Er ging iets mis.",
    };
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <article class="contact" id="contact">
    <div class="contact__wrapper">
      <div class="contact__content">
        <h3>Maatwerk Interieur Project Starten? Vraag Advies.</h3>
        <p>
          Bent u op zoek naar een unieke schrijnwerk oplossing? Wij helpen u
          graag verder met het ontwerpen en realiseren van uw droom interieur op
          maat.
        </p>
      </div>
      <form
        @submit="handleSubmit"
        action="submit"
        method="POST"
        class="contact__form"
      >
        <div class="contact__form-row visually-hidden">
          <label for="website">
            <input
              id="website"
              type="text"
              name="website"
              placeholder="Uw website"
              v-model="mailData.website"
            />
            <span>website</span>
          </label>
        </div>
        <div class="contact__form-row">
          <label for="first_name">
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="Voornaam"
              required
              v-model="mailData.first_name"
            />
            <span>Voornaam</span>
          </label>
          <label for="last_name">
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Achternaam"
              required
              v-model="mailData.last_name"
            />
            <span>Achternaam</span>
          </label>
        </div>
        <div class="contact__form-row">
          <label for="telephone">
            <input
              id="telephone"
              type="text"
              name="telephone"
              placeholder="Telefoon (optioneel)"
              v-model="mailData.phone"
            />
            <span>Telefoon (optioneel)</span>
          </label>
          <label for="email">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
              v-model="mailData.email"
            />
            <span>Email</span>
          </label>
        </div>
        <div class="contact__form-submit">
          <label for="message">
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Uw bericht"
              required
              v-model="mailData.message"
            ></textarea>
            <span>Uw bericht</span>
          </label>
          <button class="contact__form-button" type="submit">
            <span>Uw project bespreken</span>
          </button>
        </div>
        <p
          v-if="message"
          :style="{ color: message.key === 'succes' ? 'green' : 'red' }"
        >
          {{ message.value }}
        </p>
        <p>
          By submitting this form, you agree that we may use your information to
          contact you regarding your inquiry, as described in our
          <RouterLink :to="{ name: 'PrivacyPolicy' }"
            >Privacy Policy</RouterLink
          >
        </p>
      </form>
      <div id="circle-stroke"></div>
    </div>
    <div v-if="isPage" class="contact-data">
      <div class="contact-data__wrapper">
        <img
          v-if="contactData?.contactDataImage"
          class="contact-data__img"
          :src="
            getSanityImageUrl(contactData.contactDataImage, {
              maxWidth: 400,
              aspectRatio: 1,
            })
          "
          :width="400"
          :height="400"
          :sizes
          :srcset="
            getSanityImageSrcSet(contactData.contactDataImage, {
              maxWidth: 400,
              aspectRatio: 1,
            })
          "
        />
        <div class="contact-data__content">
          <h3>Atlier Buyck</h3>
          <strong v-if="contactData?.showName && !!contactData.name">{{
            contactData.name
          }}</strong>
          <ul class="contact-data__list">
            <li v-if="contactData?.phone" class="contact-data__list-item">
              <i class="ri-phone-fill"></i>
              <p>{{ contactData.phone }}</p>
            </li>
            <li v-if="contactData?.email" class="contact-data__list-item">
              <i class="ri-mail-fill"></i>
              <p>{{ contactData.email }}</p>
            </li>
            <li v-if="contactData?.btw" class="contact-data__list-item">
              <i class="ri-briefcase-2-fill"></i>
              <p>{{ contactData.btw }}</p>
            </li>
            <li v-if="contactData?.address" class="contact-data__list-item">
              <i class="ri-map-pin-2-fill"></i>
              <address>{{ contactData.address }}</address>
            </li>
          </ul>
        </div>
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
  flex-flow: column;
}

.contact__wrapper {
  width: 100%;
  height: 100%;

  position: relative;
  padding: var(--spacing-xxxl) var(--spacing-s) var(--spacing-xxxl)
    var(--spacing-s);

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
    padding: 12.4rem var(--spacing-xxl) 15rem var(--spacing-xxl);
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

  border: var(--main) solid calc(60rem / 6);

  @media screen and (min-width: 1000px) {
    width: 124rem;
    height: 124rem;
    border: var(--main) solid calc(124rem / 6);

    top: 41.5%;
    left: -20rem;
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

  > span {
    transition: font-size 0.75s cubic-bezier(1, -0.3, 0.1, 1);
  }

  &:hover {
    transform: scale(1.2);

    > span {
      font-size: 1.35rem;
    }
  }
}

.contact-data {
  padding: var(--spacing-xxl) var(--spacing-s) var(--spacing-xl)
    var(--spacing-s);

  width: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xl);

  @media screen and (min-width: 900px) {
    padding: 0;
    padding-bottom: var(--spacing-xxxl);
  }
}

.contact-data__wrapper {
  padding: var(--spacing-xxl) var(--spacing-l);

  background-color: var(--main-lightest);
  width: 100%;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xl);

  @media screen and (min-width: 600px) {
    max-width: max-content;
    padding: var(--spacing-xxl);
  }
  @media screen and (min-width: 900px) {
    flex-flow: row;
  }
  @media screen and (min-width: 1100px) {
    padding: var(--spacing-xxxl);
    gap: var(--spacing-xxxl);
  }
}

.contact-data__img {
  aspect-ratio: 1/1;
}

.contact-data__list {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-xxs);

  padding: 0;
  margin: 0;
}

.contact-data__list-item {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
