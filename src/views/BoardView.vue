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
        this.$toast.add({ severity: 'error', summary: this.$t('toasts.errorTitleCanotBeEmpty.summary'), detail: this.$t('toasts.errorTitleCanotBeEmpty.detail'), life: 3000 });
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
      this.$toast.add({ severity: 'success', summary: this.$t('toasts.taskGroupCreated.summary'), detail: this.$t('toasts.taskGroupCreated.detail'), life: 3000 });
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
      this.$toast.add({ severity: 'success', summary: this.$t('toasts.taskGroupDeleted.summary'), detail: this.$t('toasts.taskGroupDeleted.detail'), life: 3000 });
    }
  },
  async mounted() {
    try {
      const container = this.$refs.draggable;
      if (!container) {
        throw new Error('Draggable container not found');
      }
      container.addEventListener('wheel', (event) => {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      });

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
  <div class="background-board flex flex-col relative overflow-hidden">
    <BoardNavBarComponent />
    <div class="relative flex-1 overflow-hidden overflow-x-scroll" ref="draggable">
      <draggable :list="taskGroups" class="flex flex-row space-x-4 px-4 absolute inset-0"
        @change="updateReorderedTaskGroups">
        <div v-for="tg in taskGroups" :key="tg.id">
          <TaskGroupComponent :taskGroup="tg" @delete-task-group="localDeleteTaskGroup" />
        </div>
        <div class="flex-shrink-0">
          <Button type="button" :label="this.$t('boardView.addTaskGroupButton.label')" icon="pi pi-plus" @click="isDialogVisible = true"
            class="w-40 h-12" />
        </div>
      </draggable>
    </div>

    <Dialog v-model:visible="isDialogVisible" modal :header="this.$t('boardView.addTaskGroupButton.dialog.title')" :style="{ width: '25rem' }"
      :closable=false position="center" :draggable="false" @keydown.enter.prevent="addTaskGroup()"
      @keydown.esc.prevent="isDialogVisible = false">
      <div class="flex flex-col gap-2 my-2">
        <FloatLabel variant="on">
          <InputText id="in_label" v-model="taskGroupToCreate.title" autocomplete="off" class="resize-none w-full"
            :maxlength=20 />
          <label for="in_label">{{ this.$t('boardView.addTaskGroupButton.dialog.titleLabel') }}</label>
        </FloatLabel>

        <div class="flex justify-end gap-2">
          <Button :label="this.$t('boardView.addTaskGroupButton.dialog.cancelButton')" class="p-button-text" @click="isDialogVisible = false" />
          <Button :label="this.$t('boardView.addTaskGroupButton.dialog.addButton')" icon="pi pi-check" class="p-button-primary" @click="addTaskGroup()" />
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

/* Custom scrollbar styles */
.background-board .flex-1::-webkit-scrollbar {
  height: 12px;
  background: white;
}

.background-board .flex-1::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 1);
  border-radius: 6px;
  transition: background 0.2s;
}

.background-board .flex-1:hover::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.1);
}

.background-board .flex-1::-webkit-scrollbar-track {
  background: white;
}

.background-board .flex-1 {
  scrollbar-width: 10px;
  scrollbar-color: rgba(100,100,100,1) transparent;
}


</style>
