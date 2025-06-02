<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import RegisterComponent from './RegisterComponent.vue';
import LoginComponent from './LoginComponent.vue';
import { Button } from 'primevue';
import { logout } from '@/shared/firebaseService';


export default {
  name: 'AuthView',
  components: {
    LoginComponent,
    RegisterComponent,
    Button
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
        this.$toast.add({ severity: 'success', summary: 'Logout successful', detail: 'You have successfully logged out', life: 3000 });
      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Error ocurred', detail: 'An error was ocurred while logging out', life: 3000 });
        console.error('Error logging out:', error);
      }
    }
  }

}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-fuchsia-50">
    <div class="bg-fuchsia-950 text-white p-4 rounded-xl w-xl">
      <div class="py-8">
        <h1 class="text-2xl font-bold font-[Montserrat]">{{ isLogin ? "Iniciar sesión" : "Registrarse" }}</h1>
      </div>
      <LoginComponent v-if="isLogin" />
      <RegisterComponent v-if="!isLogin" />
      <p class="text-sm text-slate-500 text-center w-full">{{ isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?" }}
        <button @click="toggleForm" to="/register" class="text-fuchsia-200 hover:text-fuchsia-900 cursor-pointer transition-all">{{ isLogin ? "Regístrate"
          : "Inicia sesión" }} </button>
      </p>
    </div>
  </div>
</template>
