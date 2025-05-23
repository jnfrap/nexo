<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { Button } from 'primevue';
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
      ]
    }
  },
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
      const newTask = {
        id: this.taskGroup.tasks.length + 1,
        title: 'New Task',
        description: '',
        status: 'todo',
        priority: 'low',
      };
      this.localTaskGroup.tasks.push(newTask);
      // localStorage.setItem('boards', JSON.stringify(this.board)); // Uncomment this line to save the new task to localStorage
    }
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

    <draggable :list="localTaskGroup.task" class="flex flex-col gap-2">
      <div v-for="t in localTaskGroup.tasks" :key="t.title">
        <TaskComponent :task="t" />
      </div>
      <Button type="button" icon="pi pi-plus" label="Add Task" class="w-full" size="small" @click="addTask()" />
    </draggable>
  </div>

  <ContextMenu ref="menu" :model="menuItems" />
</template>
