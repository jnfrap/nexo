<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import Button from 'primevue/button';
import TaskGroupComponent from '@/components/board/TaskGroupComponent.vue';
import Dialog from 'primevue/dialog';
import { FloatLabel, InputText } from 'primevue';
import { deleteAllTaskInGroup, deleteTaskGroup, getTaskGroupFromBoardId, saveTaskGroup, updateTaskGroup } from '@/shared/services/taskGroupService';
import { getBoardByID } from '@/shared/services/boardService';
import { saveTask } from '@/shared/services/taskService';
import { navHeight } from '@/shared/constants';

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
      backgroundImage: '',
      navHeight: navHeight,
      taskGroups: [],
      isDialogVisible: false,
      taskGroupToCreate: {
        title: '',
      },
    }
  },
  methods: {
    async addTaskGroup() {
      if (this.taskGroupToCreate.title.trim() === '') {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Task group title cannot be empty', life: 3000 });
        return;
      }

      this.taskGroups.push(await saveTaskGroup(this.board.id, this.taskGroupToCreate))
      this.isDialogVisible = false;
      this.taskGroupToCreate = {
        title: '',
      }
      this.$toast.add({ severity: 'success', summary: 'Created succesfully', detail: 'Task group created succesfully', life: 3000 });
    },
    async updateReorderedTasks(taskGroup) {
      // const index = this.taskGroups.findIndex(tg => tg.id === taskGroup.id);
      // if (index !== -1) {
      //   this.taskGroups[index] = taskGroup;
      //   this.board.taskGroups = this.taskGroups;
      //   await updateTaskGroup(this.board.id, taskGroup.id, taskGroup);
      // }

      await deleteAllTaskInGroup(this.board.id, taskGroup.id);
      for (const task of taskGroup.tasks) {
        await saveTask(this.board.id, taskGroup.id, task);
      }
    },
    async updateReorderedTaskGroups() {
      for (const tg of this.taskGroups) {
        await updateTaskGroup(this.board.id, tg.id, tg);
      }
    },
    async localDeleteTaskGroup(taskGroupId) {
      this.taskGroups = this.taskGroups.filter(tg => tg.id !== taskGroupId);
      this.board.taskGroups = this.taskGroups;
      const boardId = this.$route.params.boardId;
      await deleteTaskGroup(boardId, taskGroupId)
      this.$toast.add({ severity: 'success', summary: 'Deleted succesfully', detail: 'Task group deleted succesfully', life: 3000 });
    }
  },
  async mounted() {
    try {
      const boardId = this.$route.params.boardId;
      const board = await getBoardByID(boardId);
      this.backgroundImage = board.backgroundImage ? `url(${board.backgroundImage})` : 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80';
      console.log(this.backgroundImage);
      const taskGroups = await getTaskGroupFromBoardId(boardId);
      if (board) {
        this.board = board;
        this.taskGroups = taskGroups || [];
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
  <div class="background-board">
    <p>{{ board.backgroundImage }}</p>
    <h1>{{ board.title }}</h1> <!-- This must be in the future second navbar -->

    <draggable :list="taskGroups" class="flex flex-row space-x-4 mx-4" @end="updateReorderedTaskGroups">
      <div v-for="tg in taskGroups" :key="tg.id">
        <TaskGroupComponent :taskGroup="tg" @update-task-group="updateReorderedTasks"
          @delete-task-group="localDeleteTaskGroup" />
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
  </div>
</template>

<style scoped>
.background-board {
  position: relative;
  height: calc(100vh - v-bind('navHeight'));
  padding: 20px;
}

.background-board::before {
  background-image: v-bind('backgroundImage');
  background-size: cover;
  background-position: center;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 85%;
}
</style>
