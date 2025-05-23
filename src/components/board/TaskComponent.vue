<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { Button, ContextMenu, Menu } from 'primevue';

export default {
  name: 'TaskComponent',
  components: {
    Button,
    Menu,
    ContextMenu
  },
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
            // Add logic to delete the task
          }
        }
      ]
    }
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    }
  }
}
</script>

<template>
  <div class="w-full rounded-xl p-4 bg-[#f1f2f4] shadow-lg" @contextmenu="toggleMenu($event)">
    <div class="flex flex-row justify-between items-center">
      <h2 class="text-lg">{{ task.title }}</h2>

      <Button type="button" @click.stop="toggleMenu($event)" aria-haspopup="true" aria-controls="overlay_menu" unstyled
        class="cursor-pointer">
        <i class="pi pi-ellipsis-h" style="font-size: 1rem"></i>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
    </div>
  </div>

  <ContextMenu ref="menu" :model="menuItems" />
</template>
