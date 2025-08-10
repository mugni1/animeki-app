import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

import { VueQueryPlugin } from '@tanstack/vue-query'
app.use(VueQueryPlugin)

app.mount('#app')
