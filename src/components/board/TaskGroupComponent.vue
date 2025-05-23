<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { Button, Dialog, FloatLabel, InputText } from 'primevue';
import TaskComponent from './TaskComponent.vue';
import { VueDraggableNext } from 'vue-draggable-next';

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
      menuItems: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            // Add logic to edit the board
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: () => {
            // Add logic to delete the board
          }
        }
      ],
      isDialogVisible: false,
      taskToCreate: {
        id: 0,
        title: '',
      },
    }
  },
  emits: ['update-task-group'],
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
    addTask() {
      if (this.taskToCreate.title.trim() === '') {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Task title cannot be empty', life: 3000 });
        return;
      }
      this.taskToCreate.id = this.localTaskGroup.tasks.length + 1;
      this.localTaskGroup.tasks.push(this.taskToCreate);
      // TODO: Update the task group in local storage or state management, emit an event to notify parent component
      this.$emit('update-task-group', this.localTaskGroup);
      this.isDialogVisible = false;
      this.taskToCreate = {
        id: 0,
        title: '',
      }
      this.$toast.add({ severity: 'success', summary: 'Created successfully', detail: 'Task created successfully', life: 3000 });
    },
    updateReorderedTaskGroup() {
      this.$emit('update-task-group', this.localTaskGroup);
    },
  },
  created() {
    this.localTaskGroup = this.taskGroup;
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

    <draggable :list="localTaskGroup.tasks" class="flex flex-col gap-2" @end="updateReorderedTaskGroup">
      <div v-for="t in localTaskGroup.tasks" :key="t.id">
        <TaskComponent :task="t" />
      </div>
      <Button type="button" icon="pi pi-plus" label="Add Task" class="w-full" size="small" @click="isDialogVisible = true" />
    </draggable>
  </div>

  <Dialog v-model:visible="isDialogVisible" modal header="Creating new Task" :style="{ width: '25rem' }"
    :closable=false position="center" :draggable="false" @keydown.enter.prevent="addTask()"
    @keydown.esc.prevent="isDialogVisible = false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="in_label" v-model="taskToCreate.title" autocomplete="off" class="resize-none w-full"
          :maxlength=20 />
        <label for="in_label">Title</label>
      </FloatLabel>

      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel" class="p-button-text" @click="isDialogVisible = false" />
        <Button label="Create" icon="pi pi-check" class="p-button-primary" @click="addTask()" />
      </div>
    </div>
  </Dialog>

  <ContextMenu ref="menu" :model="menuItems" />
</template>
