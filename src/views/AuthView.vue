<script>
import { navHeight } from '@/shared/constants';
import AuthFormComponent from '../components/auth/AuthFormComponent.vue';

export default {
  name: 'AuthView',
  components: {
    AuthFormComponent
  },
  data() {
    return {
      navHeight: navHeight
    };
  }
}
</script>

<template>
  <div class="container">
    <AuthFormComponent />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fdf4ff;
  height: calc(100vh - v-bind('navHeight'));
  width: 100vw;
  min-width: 100vw;
}
</style>
