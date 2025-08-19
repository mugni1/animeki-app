import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// PINIA
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

// PRIME VUE
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
      cssLayer: false,
    },
  },
})

// TANSTACK
import { VueQueryPlugin } from '@tanstack/vue-query'
app.use(VueQueryPlugin)

// COMPONENTS
import ErrorPage from './components/layouts/ErrorPage.vue'
import LoadingPage from './components/layouts/LoadingPage.vue'
import BaseContainer from './components/shared/BaseContainer.vue'
import CardSecondary from './components/shared/card/CardSecondary.vue'
import { Button } from 'primevue'
import FooterPage from './components/layouts/FooterPage.vue'
app.component('ErrorPage', ErrorPage)
app.component('LoadingPage', LoadingPage)
app.component('FooterPage', FooterPage)
app.component('CardSecondary', CardSecondary)
app.component('BaseContainer', BaseContainer)
app.component('BaseButton', Button)

app.mount('#app')
