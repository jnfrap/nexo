<script>
import { InputText } from 'primevue';
import FloatLabel from 'primevue/floatlabel';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { login } from '@/shared/services/authService';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    FloatLabel,
    InputText
  },
  methods: {
    async login() {
      try {
        const user = await login(this.email, this.password);
        console.log('User loged: ', user);
        this.$toast.add({ severity: 'success', summary: 'Login successful', detail: 'You have successfully logged in', life: 3000 });
        this.$router.push('/');
      } catch (error) {
        switch (error) {
          case 'auth/user-not-found':
            this.$toast.add({ severity: 'error', summary: 'User not found', detail: 'The user with the provided email does not exist', life: 3000 });
            break;
          case 'auth/invalid-email':
            this.$toast.add({ severity: 'error', summary: 'Invalid email', detail: 'The email is invalid', life: 3000 });
            break;
          case "auth/invalid-credential":
            this.$toast.add({ severity: 'error', summary: 'Invalid credential', detail: 'The credential is invalid', life: 3000 });
            break;
          default:
            this.$toast.add({ severity: 'error', summary: 'Error ocurred', detail: 'An error was ocurred while loging in', life: 3000 });
            break;
        }
        console.error('Error logging in:', error);
      }
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is already logged in:', user);
      } else {
        console.log('No user is logged in');
      }
    });
  }
}

</script>

<template>


  <div class="bg-white text-black p-6 rounded-xl flex flex-col items-start space-y-2">
    <FloatLabel variant="in" class="w-full">
      <InputText id="email" v-model="email" class="w-full border border-slate-300 rounded-lg p-4 text-md"
        autocomplete="off" />
      <label for="email">{{ this.$t('authView.loginForm.emailLabel') }}</label>
    </FloatLabel>
    <FloatLabel variant="in" class="w-full">
      <InputText id="password" v-model="password" class="w-full border border-slate-300 rounded-lg p-4 text-md"
        type="password" autocomplete="off" />
      <label for="password">{{ this.$t('authView.loginForm.passwordLabel') }}</label>
    </FloatLabel>
    <div class="flex justify-center w-full">
      <button @click="login"
        class="bg-fuchsia-600 text-white cursor-pointer px-4 py-2 rounded-lg text-lg hover:bg-fuchsia-900 transition-all">{{ this.$t('authView.loginForm.loginButton') }}</button>
    </div>
  </div>


</template>
