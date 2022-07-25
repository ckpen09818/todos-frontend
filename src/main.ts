import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/styles/tailwind.css'
import '@/styles/app.css'
import App from './App.vue'
import router from '@/routes'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
