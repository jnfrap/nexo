<script>
import NavBarComponent from './components/misc/navbar/NavBarComponent.vue';
import { storage } from './shared/storage';
import { reorderBoarsdArray } from './shared/utils';

export default {
  name: 'App',
  components: {
    NavBarComponent
  },
  created() {
    storage.boards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : [];
    storage.filteredBoards = storage.boards;
    storage.boards = reorderBoarsdArray(storage.boards);
  }
}
</script>

<template>
  <NavBarComponent />
  <RouterView />
</template>
