<script>
import { defaultBackgroundImage, navHeight } from '@/shared/constants';
import AuthFormComponent from '../components/auth/AuthFormComponent.vue';

export default {
  name: 'AuthView',
  components: {
    AuthFormComponent
  },
  data() {
    return {
      navHeight: navHeight,
      defaultBackgroundImage: defaultBackgroundImage
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
  background-image: v-bind('defaultBackgroundImage');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - v-bind('navHeight'));
  width: 100vw;
  min-width: 100vw;
}
</style>
