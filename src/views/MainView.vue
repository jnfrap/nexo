<script>
import BoardPreviewComponent from '@/components/main/BoardPreviewComponent.vue';
import { storage } from '@/shared/storage.js'

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
    this.boards = storage.filteredBoards;
  }
}
</script>

<template>
  <div class="w-4/5 mx-auto flex flex-col items-center py-10">
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
    <div v-for="board in boards" :key="board.id">
      <BoardPreviewComponent
        :id="board.id"
        :title="board.title"
        :backgroundImage="board.backgroundImage"
        :isFavorite="board.isFavorite"
      />
    </div>
  </div>
  </div>
</template>
