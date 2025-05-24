<script>
import Popover from 'primevue/popover';
import { ref } from 'vue';
import { getRecents, saveToRecents } from '@/shared/utils';

export default {
  data() {
    return {
      selectedBoard: null,
      recentBoards: ref([]),
    }
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    selectBoard(board) {
      this.selectedBoard = board;
      saveToRecents(board);
      this.recentBoards.value = getRecents();
      this.$refs.op.hide();
    }
  },
  mounted(){
    this.recentBoards.value = getRecents();
  },
  components: {
    Popover
  }
};
</script>

<template>
  <div class="card flex justify-center">
    <button type="button" @click="toggle"
      class="min-w-48 cursor-pointer rounded-lg bg-fuchsia-500 text-white hover:bg-fuchsia-600">
      <i class="pi pi-chevron-down mr-2"></i>
      {{ selectedBoard ? selectedBoard.name : 'Tableros recientes' }}
    </button>
    <Popover ref="op">
      <div class="flex flex-col gap-4">
        <div>
          <span class="font-medium block mb-2">Tableros recientes</span>
          <ul class="list-none p-0 m-0 flex flex-col">
            <li v-for="board in recentBoards" :key="board.id"
              class="flex items-center gap-2 px-2 py-3 hover:bg-fuchsia-100 cursor-pointer rounded"
              @click="selectBoard(board)">
              <i :class="`${board.icon} text-fuchsia-500`"></i>
              <span class="font-medium">{{ board.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  </div>
</template>