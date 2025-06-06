<script>
import { register } from '@/shared/services/authService';
import { FloatLabel, InputText } from 'primevue';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      email: '',
      password: '',
      displayName: ''
    }
  },
  components: {
    FloatLabel,
    InputText
  },
  methods: {
    async register() {
      try {
        const user = await register(this.email, this.password, this.displayName);
        console.log('User registered: ', user);
        this.$toast.add({ severity: 'success', summary: this.$t('toasts.register.summary'), detail: this.$t('toasts.register.detail'), life: 3000 });
        this.$router.push('/');
      } catch (error) {
        this.$toast.add({ severity: 'error', summary: this.$t('toasts.registerError.summary'), detail: this.$t('toasts.registerError.detail'), life: 3000 });
        console.error('Error registering:', error);
      }
    }
  }
}

</script>

<template>



  <div class="bg-white text-black p-6 rounded-xl flex flex-col items-start space-y-2">
    <FloatLabel variant="in" class="w-full">
      <InputText id="email" v-model="email" class="w-full border border-slate-300 rounded-lg p-4 text-md" type="email"
        autocomplete="off" />
      <label for="email">{{ this.$t('authView.registerForm.emailLabel') }}</label>
    </FloatLabel>
    <FloatLabel variant="in" class="w-full">
      <InputText id="displayName" v-model="displayName" class="w-full border border-slate-300 rounded-lg p-4 text-md"
        autocomplete="off" :maxlength=15 />
      <label for="displayName">{{ this.$t('authView.registerForm.usernameLabel') }}</label>
    </FloatLabel>
    <FloatLabel variant="in" class="w-full">
      <InputText id="password" v-model="password" class="w-full border border-slate-300 rounded-lg p-4 text-md"
        type="password" autocomplete="off" />
      <label for="password">{{ this.$t('authView.registerForm.passwordLabel') }}</label>
    </FloatLabel>
    <div class="flex justify-center w-full">
      <button @click="register"
        class="bg-fuchsia-600 cursor-pointer text-white px-4 py-2 rounded-lg text-lg hover:bg-fuchsia-900 transition-all">{{ this.$t('authView.registerForm.registerButton') }}</button>
    </div>
  </div>

</template>
