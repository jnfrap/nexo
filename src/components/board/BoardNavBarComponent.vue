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
      <Button class="text-white cursor-pointer mt-1.5" icon="pi pi-arrow-left" @click="goBack" aria-label="Back to boards"
        unstyled />
      <h1 class="text-white text-2xl p-0">{{ board.title }}</h1>
      <div class="text-yellow-400 mt-1.5">
        <i v-if="board.isFavorite" class="pi pi-star-fill" title="Favorite" style="font-size: 1.5rem"></i>
        <i v-else class="pi pi-star" title="No favorite" style="font-size: 1.5rem"></i>
      </div>
    </div>
  </div>
</template>

<style>
.sdgdfg {
  color: #b0b0b094;
}
</style>
