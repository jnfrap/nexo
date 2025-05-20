<script setup>
import { RouterView } from 'vue-router'
import NavBarComponent from './components/misc/NavBarComponent.vue';
</script>

<template>
  <NavBarComponent />
  <RouterLink to="/auth" class="text-fuchsia-600 hover:text-fuchsia-900 transition-all">Login</RouterLink>
  <RouterView />
</template>
