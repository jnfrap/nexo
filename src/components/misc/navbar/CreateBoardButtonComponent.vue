<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';

export default {
  name: 'CreateBoardButtonComponent',
  data() {
    return {
      isDialogVisible: false
    }
  },

  components: {
    Button,
    Dialog,
    InputText,
    FloatLabel,
    Textarea,
    Toast
  },
  methods: {
    createBoard() {
      // Logic to create a new board
      console.log('Creating a new board with title:', this.value1);
      this.isDialogVisible = false;
      this.$toast.add({ severity: 'success', summary: 'Created succesfully', detail: 'Board created succesfully', life: 3000 });
    }
  }
}
</script>

<template>
  <Button label="Create Board" icon="pi pi-plus" class="p-button-raised p-button-primary"
    @click="isDialogVisible = true" />

  <Dialog v-model:visible="isDialogVisible" modal header="Creating new board" :style="{ width: '25rem' }" :closable=false
    position="center" :draggable="false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="in_label" v-model="value1" autocomplete="off" class="resize-none w-full" />
        <label for="in_label">Title</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <Textarea id="desc" v-model="value1" autocomplete="off" :maxlength="5000" :minlength="10"
          class="h-28 resize-none overflow-y-auto w-full overflow-hidden" />
        <label for="desc">Description</label>
      </FloatLabel>
      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel" class="p-button-text" @click="isDialogVisible = false" />
        <Button label="Create" icon="pi pi-check" class="p-button-primary" @click="createBoard()" />
      </div>
    </div>
  </Dialog>

  <Toast />
</template>
