<script>
import AuthFormComponent from '../components/auth/AuthFormComponent.vue';


export default {
  name: 'AuthView',
  components: {
    AuthFormComponent
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-fuchsia-50">
    <AuthFormComponent/>
  </div>
</template>
