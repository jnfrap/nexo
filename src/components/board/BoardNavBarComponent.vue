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
  <div class="flex items-center justify-between px-6 h-[50px] bg-[#b0b0b094] shadow-md">
    <h1 class="text-white text-xl">{{ board.title }}</h1>
  </div>
</template>

<style>
.sdgdfg {
  color: #b0b0b094;
}
</style>
