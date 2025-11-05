import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './assets/scss/index.scss'
import 'remixicon/fonts/remixicon.css'
import App from './App.vue'

import { gsap } from "gsap"; 
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);


const app =  createApp(App)
const head = createHead()

// Import the router
import router from './routes'

app.use(router)
app.use(head)

app.mount('#app')

