<script>
import BoardPreviewComponent from '@/components/main/BoardPreviewComponent.vue';
import { storage } from '@/shared/storage.js'
import { reorderBoarsdArray } from '@/shared/utils';

export default {
  data() {
    return {
      boards: []
    }
  },
  components: {
    BoardPreviewComponent
  },
  methods: {
  },
  mounted() {
    storage.boards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : [];
    storage.boards = reorderBoarsdArray(storage.boards);
    this.boards = storage.boards;
  }
}
</script>

<template>
  <div class="w-4/5 mx-auto flex flex-col items-center py-10">
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
      <div v-for="board in boards" :key="board.id">
        <BoardPreviewComponent :board="board" />
      </div>
    </div>
  </div>
</template>
