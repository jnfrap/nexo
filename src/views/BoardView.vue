<script>
import TaskContainerComponent from '@/components/board/TaskContainerComponent.vue';

export default {
  name: 'BoardView',
  components: {
    TaskContainerComponent
  },
  data() {
    return {
      board: {}
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
  <div class="flex flex-row space-x-4 mx-4">
    <TaskContainerComponent />
    <TaskContainerComponent />
    <TaskContainerComponent />
    <TaskContainerComponent />
  </div>
</template>
