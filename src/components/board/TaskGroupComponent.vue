<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { Button, Dialog, FloatLabel, InputText } from 'primevue';
import TaskComponent from './TaskComponent.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { getTasksByGroupId, saveTask, deleteTask } from '@/shared/firebaseService';

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
      isEditMode: false,
      menuItems: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.taskToCreate.title = this.localTaskGroup.title;
            this.isEditMode = true;
            this.isDialogVisible = true;
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
      isDialogVisible: false,
      taskToCreate: {
        title: '',
      },
      tasks: []
    }
  },
  emits: [
    'update-task-group',
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
      if (this.isEditMode) {
        this.localTaskGroup.title = this.taskToCreate.title;
        this.$emit('update-task-group', this.localTaskGroup);
        this.isEditMode = false;
        this.isDialogVisible = false;
        this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Task group updated', life: 3000 });
        return;
      }
      const boardId = this.$route.params.boardId;
      const taskGroupId = this.localTaskGroup.id;
      const savedTask = await saveTask(boardId, taskGroupId, this.taskToCreate)
      this.localTaskGroup.tasks.push(savedTask);
      this.$emit('update-task-group', this.localTaskGroup);
      this.isDialogVisible = false;
      this.taskToCreate = {
        title: '',
      }
      this.$toast.add({ severity: 'success', summary: 'Created successfully', detail: 'Task created successfully', life: 3000 });
    },
    updateReorderedTaskGroup() {
      this.$emit('update-task-group', this.localTaskGroup);
    },
    async deleteTask(taskId) {
      const boardId = this.$route.params.boardId;
      const taskGroupId = this.localTaskGroup.id;
      await deleteTask(boardId, taskGroupId, taskId);
      this.localTaskGroup.tasks = this.localTaskGroup.tasks.filter(task => task.id !== taskId);
      this.$emit('update-task-group', this.localTaskGroup);
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
  },
  async created() {
    this.localTaskGroup = this.taskGroup;
    try {
      const boardId = this.$route.params.boardId;
      const tasks = await getTasksByGroupId(this.localTaskGroup.id, boardId);
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

    <draggable :list="localTaskGroup.tasks" class="flex flex-col gap-2" @end="updateReorderedTaskGroup" group="tasks">
      <div v-for="t in localTaskGroup.tasks" :key="t.id">
        <TaskComponent :task="t" @delete-task="deleteTask" />
      </div>
      <Button type="button" icon="pi pi-plus" label="Add Task" class="w-full" size="small"
        @click="isDialogVisible = true" />
    </draggable>
  </div>

  <Dialog v-model:visible="isDialogVisible" modal :header="isEditMode ? 'Edit Task Group' : 'Creating new Task'"
    :style="{ width: '25rem' }" :closable=false position="center" :draggable="false" @keydown.enter.prevent="addTask()"
    @keydown.esc.prevent="isDialogVisible = false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="in_label" v-model="taskToCreate.title" autocomplete="off" class="resize-none w-full"
          :maxlength=20 />
        <label for="in_label">Title</label>
      </FloatLabel>

      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel" class="p-button-text" @click="isDialogVisible = false" />
        <Button :label="isEditMode ? 'Save' : 'Create'" icon="pi pi-check" class="p-button-primary"
          @click="addTask()" />
      </div>
    </div>
  </Dialog>

  <ContextMenu ref="menu" :model="menuItems" />
</template>
