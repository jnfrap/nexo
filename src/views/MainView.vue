<script>
import BoardPreviewComponent from '@/components/main/BoardPreviewComponent.vue';
import { deleteBoard } from '@/shared/services/boardService';
import { storage } from '../shared/storage.js'

export default {
  data() {
    return {
      storage: storage
    }
  },
  components: {
    BoardPreviewComponent
  },
  methods: {
    async deleteBoard(boardId) {
      console.log('Deleting board with ID:', boardId);
      try {
        const boardIndex = this.storage.boards.findIndex(board => board.id === boardId);
        if (boardIndex === -1) {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Board not found', life: 3000 });
          throw new Error('Board not found');
        }

        await deleteBoard(boardId);
        this.storage.boards.splice(boardIndex, 1);
      } catch (error) {
        console.error('Error deleting board:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while deleting the board', life: 3000 });
      }
    }
  }
}
</script>

<template>
  <div class="w-4/5 mx-auto flex flex-col items-center py-10">
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
      <div v-for="board in this.storage.filteredBoards" :key="board.id">
        <BoardPreviewComponent :board="board" @delete-board="deleteBoard" />
      </div>
    </div>
  </div>
</template>
