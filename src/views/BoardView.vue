<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { VueDraggableNext } from 'vue-draggable-next'
import Button from 'primevue/button';
import TaskGroupComponent from '@/components/board/TaskGroupComponent.vue';
import Dialog from 'primevue/dialog';
import { FloatLabel, InputText } from 'primevue';
import { deleteTaskGroup, getTaskGroupFromBoardId, saveTaskGroup, updateTaskGroup } from '@/shared/services/taskGroupService';
import { getBoardByID } from '@/shared/services/boardService';
import { defaultBackgroundImage, navHeight } from '@/shared/constants';
import { reorderTaskGroupsArray } from '@/shared/utils';
import BoardNavBarComponent from '@/components/board/BoardNavBarComponent.vue';

export default {
  name: 'BoardView',
  components: {
    TaskGroupComponent,
    draggable: VueDraggableNext,
    Button,
    Dialog,
    FloatLabel,
    InputText,
    BoardNavBarComponent
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
        order: 0,
      },
    }
  },
  methods: {
    async addTaskGroup() {
      if (this.taskGroupToCreate.title.trim() === '') {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Task group title cannot be empty', life: 3000 });
        return;
      }

      this.taskGroupToCreate.order = this.taskGroups.length + 1;
      this.taskGroups.push(await saveTaskGroup(this.board.id, this.taskGroupToCreate))
      this.isDialogVisible = false;
      this.taskGroupToCreate = {
        title: '',
        order: 0,
      }
      this.taskGroups = reorderTaskGroupsArray(this.taskGroups);
      this.$toast.add({ severity: 'success', summary: 'Created succesfully', detail: 'Task group created succesfully', life: 3000 });
    },
    async updateReorderedTaskGroups() {
      this.taskGroups = this.taskGroups.map((tg, index) => {
        return { ...tg, order: index + 1 };
      });
      this.taskGroups = reorderTaskGroupsArray(this.taskGroups);
      for (const tg of this.taskGroups) {
        await updateTaskGroup(this.board.id, tg.id, tg);
      }
    },
    async localDeleteTaskGroup(taskGroupId) {
      this.taskGroups = this.taskGroups.filter(tg => tg.id !== taskGroupId);
      const boardId = this.$route.params.boardId;
      await deleteTaskGroup(boardId, taskGroupId)
      this.$toast.add({ severity: 'success', summary: 'Deleted succesfully', detail: 'Task group deleted succesfully', life: 3000 });
    }
  },
  async mounted() {
    try {
      const boardId = this.$route.params.boardId;
      const board = await getBoardByID(boardId);
      this.backgroundImage = board.backgroundImage ? `url(${board.backgroundImage})` : defaultBackgroundImage;
      const taskGroups = await getTaskGroupFromBoardId(boardId);
      if (board) {
        this.board = board;
        this.taskGroups = reorderTaskGroupsArray(taskGroups) || [];
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
    <BoardNavBarComponent />
    <draggable :list="taskGroups" class="flex flex-row space-x-4 mx-4" @change="updateReorderedTaskGroups">
      <div v-for="tg in taskGroups" :key="tg.id">
        <TaskGroupComponent :taskGroup="tg" @delete-task-group="localDeleteTaskGroup" />
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
