<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import Button from 'primevue/button';
import TaskGroupComponent from '@/components/board/TaskGroupComponent.vue';
import Dialog from 'primevue/dialog';
import { FloatLabel, InputText } from 'primevue';
import { updateBoardInLocalStorage } from '@/shared/utils';

export default {
  name: 'BoardView',
  components: {
    TaskGroupComponent,
    draggable: VueDraggableNext,
    Button,
    Dialog,
    FloatLabel,
    InputText
  },
  data() {
    return {
      board: {},
      taskGroups: [],
      isDialogVisible: false,
      taskGroupToCreate: {
        id: 0,
        title: '',
        tasks: []
      },
    }
  },
  methods: {
    addTaskGroup() {
      if (this.taskGroupToCreate.title.trim() === '') {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Task group title cannot be empty', life: 3000 });
        return;
      }
      this.taskGroupToCreate.id = this.taskGroups.map(tg => tg.id).length > 0 ? Math.max(...this.taskGroups.map(tg => tg.id)) + 1 : 1;
      this.taskGroups.push(this.taskGroupToCreate);
      this.board.taskGroups = this.taskGroups;
      updateBoardInLocalStorage(this.board);
      this.isDialogVisible = false;
      this.taskGroupToCreate = {
        id: 0,
        title: '',
        tasks: []
      }
      this.$toast.add({ severity: 'success', summary: 'Created succesfully', detail: 'Task group created succesfully', life: 3000 });
    },
    updateReorderedTasks(taskGroup) {
      const index = this.taskGroups.findIndex(tg => tg.id === taskGroup.id);
      if (index !== -1) {
        this.taskGroups[index] = taskGroup;
        this.board.taskGroups = this.taskGroups;
        updateBoardInLocalStorage(this.board);
      }
    },
    updateReorderedTaskGroups() {
      this.board.taskGroups = this.taskGroups;
      updateBoardInLocalStorage(this.board);
    },
    deleteTaskGroup(taskGroupId) {
      this.taskGroups = this.taskGroups.filter(tg => tg.id !== taskGroupId);
      this.board.taskGroups = this.taskGroups;
      updateBoardInLocalStorage(this.board);
      this.$toast.add({ severity: 'success', summary: 'Deleted succesfully', detail: 'Task group deleted succesfully', life: 3000 });
    },
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

  <draggable :list="taskGroups" class="flex flex-row space-x-4 mx-4" @end="updateReorderedTaskGroups">
    <div v-for="tg in taskGroups" :key="tg.id">
      <TaskGroupComponent :taskGroup="tg" @update-task-group="updateReorderedTasks"
        @delete-task-group="deleteTaskGroup" />
    </div>
    <div class="flex-shrink-0">
      <Button type="button" label="Add task group" icon="pi pi-plus" @click="isDialogVisible = true"
        class="w-40 h-12" />
    </div>
  </draggable>

  <Dialog v-model:visible="isDialogVisible" modal header="Creating new Task Group" :style="{ width: '25rem' }"
    :closable=false position="center" :draggable="false" @keydown.enter.prevent="addTaskGroup()"
    @keydown.esc.prevent="isDialogVisible = false">
    <div class="flex flex-col gap-2 my-2">
      <FloatLabel variant="on">
        <InputText id="in_label" v-model="taskGroupToCreate.title" autocomplete="off" class="resize-none w-full"
          :maxlength=20 />
        <label for="in_label">Title</label>
      </FloatLabel>

      <div class="flex justify-end gap-2">
        <Button label="Cancel" class="p-button-text" @click="isDialogVisible = false" />
        <Button label="Create" icon="pi pi-check" class="p-button-primary" @click="addTaskGroup()" />
      </div>
    </div>
  </Dialog>
</template>
