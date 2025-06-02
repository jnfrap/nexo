<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import Button from 'primevue/button';
import TaskGroupComponent from '@/components/board/TaskGroupComponent.vue';
import Dialog from 'primevue/dialog';
import { FloatLabel, InputText } from 'primevue';
import { getBoardByID, getTaskGroupFromBoardId, saveTaskGroup, deleteTaskGroup as delTaskGroup, updateTaskGroup } from '@/shared/services/firebaseService';

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
      const index = this.taskGroups.findIndex(tg => tg.id === taskGroup.id);
      if (index !== -1) {
        this.taskGroups[index] = taskGroup;
        this.board.taskGroups = this.taskGroups;
        await updateTaskGroup(this.board.id, taskGroup.id, taskGroup);
      }
    },
    async updateReorderedTaskGroups() {
      for (const tg of this.taskGroups) {
        await updateTaskGroup(this.board.id, tg.id, tg);
      }
    },
    async deleteTaskGroup(taskGroupId) {
      this.taskGroups = this.taskGroups.filter(tg => tg.id !== taskGroupId);
      this.board.taskGroups = this.taskGroups;
      const boardId = this.$route.params.boardId;
      await delTaskGroup(boardId, taskGroupId)
      this.$toast.add({ severity: 'success', summary: 'Deleted succesfully', detail: 'Task group deleted succesfully', life: 3000 });
    },
  },
  async mounted() {
    try {
      const boardId = this.$route.params.boardId;
      const board = await getBoardByID(boardId);
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
