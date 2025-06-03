<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { getBoardByID } from '@/shared/services/boardService';
import { Button } from 'primevue';

export default {
  name: 'BoardNavBarComponent',
  data() {
    return {
      board: {},
    };
  },
  components: {
    Button
  },
  methods: {
    async goBack() {
      this.$router.push('/');
    },
  },
  async mounted() {
    const boardId = this.$route.params.boardId;
    this.board = await getBoardByID(boardId);
  },
};
</script>

<template>
  <div class="flex items-center px-6 h-[50px] bg-[#b0b0b094] shadow-md">
    <div class="flex items-center gap-4">
      <Button class="text-white cursor-pointer" icon="pi pi-arrow-left" @click="goBack"
        aria-label="Back to boards" unstyled />
      <h1 class="text-white text-xl">{{ board.title }}</h1>
    </div>
  </div>
</template>

<style>
.sdgdfg {
  color: #b0b0b094;
}
</style>
