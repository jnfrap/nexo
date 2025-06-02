<script>
import NavBarComponent from './components/misc/navbar/NavBarComponent.vue';
import { ConfirmDialog, Toast } from 'primevue';
import { storage } from './shared/storage';
import { reorderBoarsdArray } from './shared/utils';
import { getBoards } from './shared/services/boardService';

export default {
  name: 'App',
  components: {
    NavBarComponent,
    ConfirmDialog,
    Toast
  },
  methods: {
    async loadBoards() {
      this.boards = await getBoards();
      storage.filteredBoards = this.boards;
    },
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
  },
  watch: {
    'storage.filteredBoards': {
      handler(newVal, oldVal) {
        console.log('filteredBoards cambió:', newVal);
        console.log('Valor anterior:', oldVal);
      },
      deep: true
    }
  }
}
</script>

<template>
  <NavBarComponent @board-created="loadBoards" />
  <RouterView />
  <ConfirmDialog :draggable="false"></ConfirmDialog>
  <Toast></Toast>
</template>
