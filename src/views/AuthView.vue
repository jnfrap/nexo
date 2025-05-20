<script>
import RegisterComponent from '../components/auth/RegisterComponent.vue';
import LoginComponent from '../components/auth/LoginComponent.vue';


export default {
  name: 'AuthView',
  components: {
    LoginComponent,
    RegisterComponent
  }
}
</script>

<template>
  <LoginComponent />
  <RegisterComponent />
</template>
