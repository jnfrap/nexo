<script>
import { getBoardByID } from '@/shared/services/boardService';

export default {
  name: 'BoardNavBarComponent',
  data() {
    return {
      board: {},
    };
  },
  async mounted() {
    const boardId = this.$route.params.boardId;
    this.board = await getBoardByID(boardId);
  },
};
</script>

<template>
  <div class="flex items-center justify-between px-6 py-3 bg-black-800 text-white shadow-md">
    <h1>{{ board.title }}</h1>
  </div>
</template>
