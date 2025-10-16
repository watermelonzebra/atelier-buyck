import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './assets/scss/index.scss'
import App from './App.vue'

const app =  createApp(App)
const head = createHead()

// Import the router
import router from './routes'

app.use(router)
app.use(head)

app.mount('#app')

