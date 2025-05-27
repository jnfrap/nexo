<script>
import { register } from '@/shared/firebaseService';
import { FloatLabel, InputText } from 'primevue';

export default {
  name: 'RegisterComponent',
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
    async register() {
      try {
        const user = await register(this.email, this.password);
        console.log('User registered: ', user);
      } catch (error) {
        this.$toast.add({ severity: 'error', summary: 'Error ocurred', detail: 'An error ocurred while registrating new user', life: 3000 });
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
      <label for="email">Email</label>
    </FloatLabel>
    <FloatLabel variant="in" class="w-full">
      <InputText id="password" v-model="password" class="w-full border border-slate-300 rounded-lg p-4 text-md"
        type="password" autocomplete="off" />
      <label for="password">Contraseña</label>
    </FloatLabel>
    <div class="flex justify-center w-full">
      <button @click="register"
        class="bg-fuchsia-600 cursor-pointer text-white px-4 py-2 rounded-lg text-lg hover:bg-fuchsia-900 transition-all">Guardar</button>
    </div>
  </div>

</template>
