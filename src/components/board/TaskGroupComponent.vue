<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { Button, Dialog, FloatLabel, InputText } from 'primevue';
import TaskComponent from './TaskComponent.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { deleteTask, editTask, getTasksByGroupId, saveTask } from '@/shared/services/taskService';
import { deleteAllTaskInGroup, updateTaskGroup } from '@/shared/services/taskGroupService';
import { reorderTasksArray } from '@/shared/utils';
import { getSeverityIcon, getSeverityLabel, getSeverityStyle } from '@/shared/utils';
import { Severity } from '@/shared/enums';

export default {
  name: 'TaskGroupComponent',
  components: {
    Menu,
    ContextMenu,
    Button,
    TaskComponent,
    draggable: VueDraggableNext,
    Dialog,
    InputText,
    FloatLabel
  },
  data() {
    return {
      localTaskGroup: {},
      isDialogVisible: false,
      isEditGroupDialogVisible: false,
      Severity,
      groupToEdit: {
        title: '',
        order: 0
      },
      menuItems: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.groupToEdit.title = this.localTaskGroup.title;
            this.isEditGroupDialogVisible = true;
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: () => {
            this.confirmDeletion();
          }
        }
      ],
      severityOptions: [
        { severity: Severity.LOW },
        { severity: Severity.MEDIUM },
        { severity: Severity.URGENT }
      ],
      taskToCreate: {
        title: '',
        severity: '',
        order: 0
      }
    }
  },
  emits: [
    'delete-task-group',
  ],
  props: {
    taskGroup: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    async addTask() {
      if (this.taskToCreate.title.trim() === '') {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Task title cannot be empty', life: 3000 });
        return;
      }
      const boardId = this.$route.params.boardId;
      const taskGroupId = this.localTaskGroup.id;
      this.taskToCreate.order = this.localTaskGroup.tasks.length + 1;
      const savedTask = await saveTask(boardId, taskGroupId, this.taskToCreate);
      this.localTaskGroup.tasks.push(savedTask);
      this.updateReorderedTaskGroup();
      this.isDialogVisible = false;
      this.taskToCreate = {
        title: '',
        order: 0,
        severity: ''
      }
      this.$toast.add({ severity: 'success', summary: 'Created successfully', detail: 'Task created successfully', life: 3000 });
    },
    async saveEditTaskGroup() {
      if (!this.groupToEdit.title.trim()) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Group title cannot be empty', life: 3000 });
        return;
      }
      this.localTaskGroup.title = this.groupToEdit.title;
      this.isEditGroupDialogVisible = false;
      this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Group updated', life: 3000 });
      const boardId = this.$route.params.boardId;
      const taskGroupId = this.localTaskGroup.id;
      await updateTaskGroup(boardId, taskGroupId, this.localTaskGroup);

    },
    async updateReorderedTaskGroup() {
      this.localTaskGroup.tasks = this.localTaskGroup.tasks.map((task, index) => ({
        ...task,
        order: index + 1
      }));
      const boardId = this.$route.params.boardId;
      await deleteAllTaskInGroup(boardId, this.localTaskGroup.id);
      for (const task of this.localTaskGroup.tasks) {
        await saveTask(boardId, this.localTaskGroup.id, task);
      }
      this.localTaskGroup.tasks = reorderTasksArray(this.localTaskGroup.tasks);
    },
    async deleteTask(taskId) {
      const boardId = this.$route.params.boardId;
      const taskGroupId = this.localTaskGroup.id;
      await deleteTask(boardId, taskGroupId, taskId);
      this.localTaskGroup.tasks = this.localTaskGroup.tasks.filter(task => task.id !== taskId);
      await this.updateReorderedTaskGroup();
      this.$toast.add({ severity: 'info', summary: 'Deleted', detail: 'Task deleted', life: 3000 });
    },
    deleteTaskGroup() {
      this.$emit('delete-task-group', this.taskGroup.id);
    },
    confirmDeletion() {
      this.$confirm.require({
        message: `Are you sure you want to delete the task group ${this.taskGroup.title}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: 'Delete',
          severity: 'danger',
        },
        accept: () => {
          this.deleteTaskGroup();
        }
      });
    },
    getSeverityIcon(severity) {
      return getSeverityIcon(severity);
    },
    getSeverityLabel(severity) {
      return getSeverityLabel(severity, this.$t);
    },
    getSeverityStyle(severity) {
      return getSeverityStyle(severity);
    },
    async editTaskData(editedTask) {
      const task = this.localTaskGroup.tasks.findIndex(t => t.id === editedTask.id);
      if (task !== -1) {
        this.localTaskGroup.tasks[task] = editedTask;
        const boardId = this.$route.params.boardId;
        const taskGroupId = this.localTaskGroup.id;
        console.log('Editing task:', editedTask);
        console.log('Board ID:', boardId);
        console.log('Task Group ID:', taskGroupId);
        console.log('Task ID:', editedTask.id);
        console.log('Edited Task:', editedTask);
        await editTask(boardId, taskGroupId, editedTask.id, editedTask);
        this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Task updated', life: 3000 });

      }
    }
  },
  async mounted() {
    try {
      this.localTaskGroup = this.taskGroup;
      const boardId = this.$route.params.boardId;
      const tasks = reorderTasksArray(await getTasksByGroupId(this.localTaskGroup.id, boardId));
      this.localTaskGroup.tasks = tasks || [];
    }
    catch (error) {
      console.error(error);
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="w-80 rounded-xl p-4 bg-[#f1f2f4] shadow-lg" @contextmenu="toggleMenu($event)">
    <div class="flex flex-row justify-between items-center">
      <h2 class="text-lg">{{ localTaskGroup.title }}</h2>

      <Button type="button" @click.stop="toggleMenu($event)" aria-haspopup="true" aria-controls="overlay_menu" unstyled
        class="cursor-pointer">
        <i class="pi pi-ellipsis-h" style="font-size: 1rem"></i>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
    </div>

    <draggable :list="localTaskGroup.tasks" class="flex flex-col gap-2" @change="updateReorderedTaskGroup"
      group="tasks">
      <div v-for="t in localTaskGroup.tasks" :key="t.id">
        <TaskComponent :task="t" @delete-task="deleteTask" @edit-task="editTaskData" />
      </div>
      <Button type="button" icon="pi pi-plus" :label="this.$t('boardView.addTaskButton.label')" class="w-full" size="small"
        @click="isDialogVisible = true" />
    </draggable>
  </div>

  <Dialog v-model:visible="isDialogVisible" modal :header="this.$t('boardView.addTaskButton.dialog.title')" :style="{ width: '25rem' }" :closable=false
    position="center" :draggable="false" @keydown.enter.prevent="addTask()"
    @keydown.esc.prevent="isDialogVisible = false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="in_label" v-model="taskToCreate.title" autocomplete="off" class="resize-none w-full"
          :maxlength=20 />
        <label for="in_label">{{ this.$t('boardView.addTaskButton.dialog.titleLabel') }}</label>
      </FloatLabel>

      <div class="card flex justify-center flex-wrap gap-4">
        <Button v-for="option in severityOptions" :key="option.severity" :severity="getSeverityStyle(option.severity)"
          :icon="getSeverityIcon(option.severity)" :label="getSeverityLabel(option.severity)"
          class="cursor-pointer !w-24" :class="{ 'ring-2 ring-fuchsia-300': taskToCreate.severity === option.severity }"
          @click="taskToCreate.severity = option.severity" />
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button :label="this.$t('boardView.addTaskButton.dialog.cancelButton')" class="p-button-text" @click="isDialogVisible = false" />
        <Button :label="this.$t('boardView.addTaskButton.dialog.addButton')" icon="pi pi-check" class="p-button-primary" @click="addTask()" />
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="isEditGroupDialogVisible" modal header="Editing title group" :style="{ width: '25rem' }"
    :closable="false" position="center" :draggable="false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="edit_group_title" v-model="groupToEdit.title" autocomplete="off" class="resize-none w-full"
          :maxlength="30" />
        <label for="edit_group_title">Title</label>
      </FloatLabel>
      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel" class="p-button-text" @click="isEditGroupDialogVisible = false" />
        <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="saveEditTaskGroup" />
      </div>
    </div>
  </Dialog>

  <ContextMenu ref="menu" :model="menuItems" />
</template>
