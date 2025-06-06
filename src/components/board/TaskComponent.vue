<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { Button, ContextMenu, Menu, InputText, Dialog, FloatLabel } from 'primevue';
import Tag from 'primevue/tag';
import { getSeverityIcon, getSeverityLabel, getSeverityStyle } from '@/shared/utils';
import { Severity } from '@/shared/enums';



export default {
  name: 'TaskComponent',
  components: {
    Button,
    Menu,
    ContextMenu,
    Tag,
    InputText,
    Dialog,
    FloatLabel
  },
  emits: ['delete-task', 'edit-task'],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditDialogVisible: false,
      editTaskData: {
        title: '',
        severity: '',
        order: 0
      },
      serverityOptions: [
        { severity: Severity.LOW },
        { severity: Severity.MEDIUM },
        { severity: Severity.URGENT }
      ]
    }
  },
  computed: {
    menuItems() {
      return [
        {
          label: this.$t('boardView.task.contextMenu.editButton'),
          icon: 'pi pi-pencil',
          command: () => {
            this.editTaskData = { ...this.task };
            this.isEditDialogVisible = true;
          }
        },
        {
          label: this.$t('boardView.task.contextMenu.deleteButton'),
          icon: 'pi pi-trash',
          command: this.confirmDeletion
        }
      ];
    }
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    confirmDeletion() {
      this.$confirm.require({
        message: `${this.$t('boardView.task.deleteDialog.message')} ${this.task.title}?`,
        header: this.$t('boardView.task.deleteDialog.title'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: this.$t('boardView.task.deleteDialog.cancelButton'),
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: this.$t('boardView.task.deleteDialog.confirmButton'),
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
      return getSeverityLabel(severity, this.$t);
    },
    getSeverityStyle(severity) {
      return getSeverityStyle(severity);
    },
    saveEditTask() {
      if (!this.editTaskData.title.trim()) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Title cannot be empty', life: 3000 });
        return;
      }
      this.$emit('edit-task', { ...this.editTaskData, id: this.task.id });
      this.isEditDialogVisible = false;
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

  <Dialog v-model:visible="isEditDialogVisible" modal :header="this.$t('boardView.task.editDialog.title')" :style="{ width: '25rem' }" :closable="false"
    position="center" :draggable="false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="edit_title" v-model="editTaskData.title" autocomplete="off" class="resize-none w-full"
          :maxlength="20" />
        <label for="edit_title">{{ this.$t('boardView.task.editDialog.titleLabel') }}</label>
      </FloatLabel>
      <div class="card flex justify-center flex-wrap gap-4">
        <Button v-for="option in serverityOptions" :key="option.severity" :severity="getSeverityStyle(option.severity)"
          :icon="getSeverityIcon(option.severity)" :label="getSeverityLabel(option.severity)"
          class="cursor-pointer !w-24" :class="{ 'ring-2 ring-fuchsia-300': editTaskData.severity === option.severity }"
          @click="editTaskData.severity = option.severity" />
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <Button :label="this.$t('boardView.task.editDialog.cancelButton')" class="p-button-text" @click="isEditDialogVisible = false" />
        <Button :label="this.$t('boardView.task.editDialog.saveButton')" icon="pi pi-check" class="p-button-primary" @click="saveEditTask" />
      </div>
    </div>
  </Dialog>
</template>
