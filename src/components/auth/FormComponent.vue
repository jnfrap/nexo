<script>
import RegisterComponent from './RegisterComponent.vue';
import LoginComponent from './LoginComponent.vue';


export default {
  name: 'AuthView',
  components: {
    LoginComponent,
    RegisterComponent
  },
  data() {
    return {
      isLogin: true // Cambia esto a false para mostrar el registro
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    }
  }

}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-fuchsia-50">
    <div class="bg-fuchsia-950 text-white p-4 rounded-xl w-xl">
      <div class="py-8">
        <h1 class="text-2xl font-bold">{{ isLogin ? "Iniciar sesión" : "Registrarse" }}</h1>
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