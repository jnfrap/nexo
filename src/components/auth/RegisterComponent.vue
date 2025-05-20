<script>
import { FloatLabel } from 'primevue';

export default {
  name: 'RegisterComponent',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    FloatLabel
  },
  methods: {
    register() {
      //Lógica para registrar usuario
    }
  }
}

</script>

<template>
  <div class="flex justify-center items-center h-screen bg-fuchsia-50">
    <div class="bg-fuchsia-950 text-white p-4 rounded-xl w-xl">
      <div class="py-8">
        <h1 class="text-2xl font-bold">Registrarse</h1>
      </div>
      <div class="bg-white text-black p-6 rounded-xl flex flex-col items-start space-y-2">
        <FloatLabel variant="in" class="w-full">
          <input id="email" v-model="email" class="w-full border border-slate-300 rounded-lg p-4 text-md" type="email"
            autocomplete="off" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel variant="in" class="w-full">
          <input id="password" v-model="password" class="w-full border border-slate-300 rounded-lg p-4 text-md"
            type="password" autocomplete="off" />
          <label for="password">Contraseña</label>
        </FloatLabel>
        <div class="flex justify-between w-full">
          <button @click="register"
            class="bg-fuchsia-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-fuchsia-900 transition-all">Guardar</button>

          <p class="text-sm text-slate-500">¿Ya tienes cuenta? <RouterLink to="/auth"
              class="text-fuchsia-600 hover:text-fuchsia-900 transition-all">Inicia sesión</RouterLink>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>