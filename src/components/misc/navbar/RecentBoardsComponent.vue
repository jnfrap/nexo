<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Popover from 'primevue/popover';
import { storage } from '@/shared/storage';
import { maxBoardsInRecentBoards } from '@/shared/constants';
import Button from 'primevue/button';

export default {
  components: {
    Popover,
    Button
  },
  data() {
    return {
      storage: storage,
    }
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    selectBoard(board) {
      board.lastAccessedAt = new Date().toISOString();
      this.storage.boards = this.storage.boards.map(b => {
        if (b.id === board.id) {
          return { ...b, lastAccessedAt: board.lastAccessedAt };
        }
        return b;
      });
      this.$refs.op.hide();
      this.$router.push({ name: 'board', params: { boardId: board.id } });
    }
  },
  computed: {
    recentBoards() {
      const recentBoards = this.storage.boards
        .filter(board => board.lastAccessedAt)
        .sort((a, b) => new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt))
        .slice(0, maxBoardsInRecentBoards);
      return recentBoards;
    }
  }
};
</script>

<template>
  <div class="card flex justify-center">
    <Button type="button" @click="toggle"
      class="bg-[#d208f3] rounded-[50px] text-[17px] min-w-[150px] w-fit px-3 border-none hover:bg-[#b800d6] cursor-pointer font-bold text-white h-[30px]"
      :label="this.$t('navbar.recentBoards')" icon="pi pi-chevron-down mr-2" unstyled />
    <Popover ref="op">
      <div class="flex flex-col gap-4">
        <div>
          <span class="font-medium block mb-2">{{ this.$t('navbar.recentBoards') }}</span>
          <ul class="list-none p-0 m-0 flex flex-col">
            <li v-for="board in recentBoards" :key="board.id"
              class="flex items-center gap-2 px-2 py-3 hover:bg-fuchsia-100 cursor-pointer rounded"
              @click="selectBoard(board)">
              <i :class="`${board.icon || 'pi pi-table'} text-fuchsia-500`"></i>
              <span class="font-medium">{{ board.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  </div>
</template>
