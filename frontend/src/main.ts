import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import "./assets/scss/index.scss";
import "remixicon/fonts/remixicon.css";
import App from "./App.vue";

// Import the router
import router from "./routes";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const app = createApp(App);
const head = createHead({
  title: "Home",
  titleTemplate: "%s | Atelier Buyck",
  meta: [
    {
      name: "title",
      content:
        "Schrijnwerk op Maat Izegem | Exclusieve Interieurs - Atelier Buyck",
    },
    {
      name: "description",
      content:
        "...gedreven door detail en vakmanschap...	Wij ontwerpen en realiseren uw maatwerk interieur, van kastenwanden tot keukens op maat in de regio Izegem. Vraag nu uw vrijblijvende offerte aan!",
    },
  ],
});



app.use(router);
app.use(head);

app.mount("#app");
