<script setup>
import { RouterView } from 'vue-router'
import NavBarComponent from './components/misc/navbar/NavBarComponent.vue';
import { ConfirmDialog, Toast } from 'primevue';
</script>

<template>
  <NavBarComponent />
  <RouterView />
  <ConfirmDialog :draggable="false"></ConfirmDialog>
  <Toast></Toast>
</template>
