<script>
import NavBarComponent from './components/misc/navbar/NavBarComponent.vue';
import { ConfirmDialog, Toast } from 'primevue';
import { storage } from './shared/storage';
import { reorderBoarsdArray } from './shared/utils';
import { getBoards } from './shared/firebaseService';

export default {
  name: 'App',
  components: {
    NavBarComponent,
    ConfirmDialog,
    Toast
  },
  async created() {
    try {
      const boards = await getBoards();
      storage.boards = boards || [];
    } catch (error) {
      if (error.message !== 'No boards found') {
        console.error('Error fetching boards:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching boards', life: 3000 });
      }
    }
    storage.filteredBoards = storage.boards;
    storage.boards = reorderBoarsdArray(storage.boards);
  }
}
</script>

<template>
  <NavBarComponent />
  <RouterView />
  <ConfirmDialog :draggable="false"></ConfirmDialog>
  <Toast></Toast>
</template>
