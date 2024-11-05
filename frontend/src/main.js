import './assets/main.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Button from 'primevue/button'
import Aura from '@primevue/themes/aura'
import lara from '@primevue/themes/aura'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Incl
import ToastService from 'primevue/toastservice'

const app = createApp(App)

const pinia = createPinia()
pinia.use(persistedState) // Usa el plugin de persistencia

app.use(PrimeVue, {
  theme: {
    preset: lara,
  },
})

app.use(ToastService) // Registra el servicio ToastService

app.use(pinia)
app.use(router)
app.mount('#app')
