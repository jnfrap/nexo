<script>
import FloatLabel from 'primevue/floatlabel';


export default {
  name: 'LoginComponent',
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
    login() {
      //Lógica para iniciar sesión
    }
  }
}

</script>

<template>


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
    <div class="flex justify-center w-full">
      <button @click="login"
        class="bg-fuchsia-600 text-white cursor-pointer px-4 py-2 rounded-lg text-lg hover:bg-fuchsia-900 transition-all">Entrar</button>
    </div>
  </div>


</template>