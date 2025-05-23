<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import Button from 'primevue/button';
import TaskGroupComponent from '@/components/board/TaskGroupComponent.vue';

export default {
  name: 'BoardView',
  components: {
    TaskGroupComponent,
    draggable: VueDraggableNext,
    Button
  },
  data() {
    return {
      board: {},
      taskGroups: [],
    }
  },
  methods: {
    addTaskGroup() {
      const newTaskGroup = {
        id: this.taskGroups.length + 1,
        title: 'New Task Group',
        tasks: []
      };
      this.taskGroups.push(newTaskGroup);
      this.board.taskGroups = this.taskGroups;
      // localStorage.setItem('boards', JSON.stringify(this.board)); // Uncomment this line to save the new task group to localStorage
    }
  },
  mounted() {
    try {
      const boards = localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : [];
      const boardId = parseInt(this.$route.params.boardId);
      const board = boards.find(b => b.id === boardId);
      if (board) {
        this.board = board;
        this.taskGroups = board.taskGroups;
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

  <draggable :list="taskGroups" class="flex flex-row space-x-4 mx-4">
    <div v-for="tg in taskGroups" :key="tg.title">
      <TaskGroupComponent :taskGroup="tg" />
    </div>
    <div class="flex-shrink-0">
      <Button type="button" label="Add task" icon="pi pi-plus" @click="addTaskGroup()" class="w-40 h-12" />
    </div>
  </draggable>
</template>
