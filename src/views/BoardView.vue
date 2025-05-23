<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import TaskContainerComponent from '@/components/board/TaskContainerComponent.vue';
import { VueDraggableNext } from 'vue-draggable-next'
import Button from 'primevue/button';

export default {
  name: 'BoardView',
  components: {
    TaskContainerComponent,
    draggable: VueDraggableNext,
    Button
  },
  data() {
    return {
      board: {},
      tasks: [],
    }
  },
  methods: {
    addTask() {

    }
  },
  mounted() {
    try {
      const boards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : [];
      const boardId = parseInt(this.$route.params.boardId);
      const board = boards.find(b => b.id === boardId);
      if (board) {
        this.board = board;
        this.tasks = board.tasks;
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

  <draggable :list="tasks" class="flex flex-row space-x-4 mx-4">
    <div v-for="t in list" :key="t.title">
      <TaskContainerComponent :task="t" />
    </div>
    <Button type="button" label="Add task" icon="pi pi-plus" @click="addTask()" />
  </draggable>
</template>
