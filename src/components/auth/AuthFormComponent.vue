<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import RegisterComponent from './RegisterComponent.vue';
import LoginComponent from './LoginComponent.vue';
import { logout } from '@/shared/services/authService';


export default {
  name: 'AuthView',
  components: {
    LoginComponent,
    RegisterComponent
  },
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    logout() {
      try {
        logout();
        this.$toast.add({ severity: 'success', summary: this.$t('toasts.logout.summary'), detail: this.$t('toasts.logout.detail'), life: 3000 });
      } catch (error) {
        this.$toast.add({ severity: 'error', summary: this.$t('toasts.logoutError.summary'), detail: this.$t('toasts.logoutError.detail'), life: 3000 });
        console.error('Error logging out:', error);
      }
    }
  }

}
</script>

<template>
  <div class="flex justify-center items-center bg-fuchsia-50 rounded-xl">
    <div class="bg-fuchsia-950 text-white p-4 rounded-xl w-xl">
      <div class="py-8">
        <h1 class="text-2xl font-bold font-[Montserrat]">{{ isLogin ? this.$t('authView.loginForm.title') : this.$t('authView.registerForm.title') }}</h1>
      </div>
      <LoginComponent v-if="isLogin" />
      <RegisterComponent v-if="!isLogin" />
      <p class="text-sm  text-center w-full text-white mt-3">{{ isLogin ? this.$t('authView.loginForm.dontHaveAccountLabel') : this.$t('authView.registerForm.alreadyHaveAccountLabel')
        }}&nbsp;
        <button @click="toggleForm" to="/register"
          class="text-fuchsia-200 hover:text-fuchsia-900 cursor-pointer transition-all">{{ isLogin ? this.$t('authView.loginForm.goToRegisterButton')
            : this.$t('authView.registerForm.goToLoginButton') }} </button>
      </p>
    </div>
  </div>
</template>
