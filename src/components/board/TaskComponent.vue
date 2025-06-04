<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { Button, ContextMenu, Menu } from 'primevue';
import Tag from 'primevue/tag';
import { getSeverityIcon, getSeverityLabel, getSeverityStyle } from '@/shared/utils';


export default {
  name: 'TaskComponent',
  components: {
    Button,
    Menu,
    ContextMenu,
    Tag
  },
  emits: ['delete-task'],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      menuItems: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            // Add logic to edit the task
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: () => {
            this.confirmDeletion();
          }
        }
      ]
    }
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    confirmDeletion() {
      this.$confirm.require({
        message: `Are you sure you want to delete the task ${this.task.title}?`,
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
          this.$emit('delete-task', this.task.id);
        }
      });
    },
    getSeverityIcon(severity) {
      return getSeverityIcon(severity);

    },
    getSeverityLabel(severity) {
      return getSeverityLabel(severity);
    },
    getSeverityStyle(severity) {
      return getSeverityStyle(severity);
    }
  }
}
</script>

<template>
  <div class="w-full rounded-xl p-4 bg-[#f1f2f4] shadow-lg" @contextmenu="toggleMenu($event)">
    <div class="flex flex-row justify-between items-center">

      <h2 class="text-lg">{{ task.title }}</h2>
      <div class="flex items-center gap-2">
        <Tag v-if="task.severity" :value="getSeverityLabel(task.severity)" :severity="getSeverityStyle(task.severity)"
          :icon="getSeverityIcon(task.severity)" class="text-xs font-semibold" />
        <Button type="button" @click.stop="toggleMenu($event)" aria-haspopup="true" aria-controls="overlay_menu"
          unstyled class="cursor-pointer">
          <i class="pi pi-ellipsis-h" style="font-size: 1rem"></i>
        </Button>
      </div>
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
    </div>
  </div>

  <ContextMenu ref="menu" :model="menuItems" />
</template>
