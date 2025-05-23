<script>
import TaskContainerComponent from '@/components/board/TaskContainerComponent.vue';
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  name: 'BoardView',
  components: {
    TaskContainerComponent,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      board: {},
      list: [
        { name: 'Task 1' },
        { name: 'Task 2' },
        { name: 'Task 3' },
        { name: 'Task 4' },
      ],
    }
  },
  methods: {
  },
  mounted() {
    try {
      const boards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : [];
      const boardId = parseInt(this.$route.params.boardId);
      const board = boards.find(b => b.id === boardId);
      if (board) {
        this.board = board;
      } else {
        throw new Error(`Board ${boardId} not found`);
      }
    } catch (error) {
      console.error(error);
      this.$router.push('/');
    }
  },
}
</script>

<template>
  <h1>{{ board.title }}</h1> <!-- This must be in the future second navbar -->

  <draggable :list="list" class="flex flex-row space-x-4 mx-4">
    <div v-for="e in list" :key="e.name">
      <TaskContainerComponent :task="{ title: e.name }"/>
    </div>
  </draggable>
</template>
