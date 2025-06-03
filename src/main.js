import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { ToastService } from 'primevue'
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App)

app.use(router)

const customPrimePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{fuchsia.50}',
      100: '{fuchsia.100}',
      200: '{fuchsia.200}',
      300: '{fuchsia.300}',
      400: '{fuchsia.400}',
      500: '{fuchsia.500}',
      600: '{fuchsia.600}',
      700: '{fuchsia.700}',
      800: '{fuchsia.800}',
      900: '{fuchsia.900}',
      950: '{fuchsia.950}'
    }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: customPrimePreset,
    options: {
      darkModeSelector: false,
    }
  }

});

app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app')
