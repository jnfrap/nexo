<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import { getAuth } from 'firebase/auth';
import { getRandomBackgroundImage } from '@/shared/utils';
import { saveBoard } from '@/shared/services/boardService';
import { storage } from '@/shared/storage';

export default {
  name: 'CreateBoardButtonComponent',
  data() {
    return {
      isDialogVisible: false,
      boardToCreate: {
        title: '',
        description: '',
        backgroundImage: '',
        isFavorite: false,
        createdAt: '',
        userId: '',
        lastAccessedAt: '',
      },
      storage: storage,
    }
  },
  components: {
    Button,
    Dialog,
    InputText,
    FloatLabel,
    Textarea
  },
  methods: {
    async createBoard() {
      try {
        if (this.boardToCreate.title.trim() === '') {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Board title cannot be empty', life: 3000 });
          return;
        }
        const auth = getAuth();
        const user = auth.currentUser;
        const boardToSave = {
          title: this.boardToCreate.title,
          description: this.boardToCreate.description,
          backgroundImage: getRandomBackgroundImage(),
          isFavorite: false,
          createdAt: new Date().toISOString(),
          lastAccessedAt: '',
          userId: user.uid
        }

        await saveBoard(boardToSave);

        this.isDialogVisible = false;
        this.$toast.add({ severity: 'success', summary: 'Created succesfully', detail: 'Board created succesfully', life: 3000 });

        this.boardToCreate = {
          title: '',
          description: '',
          backgroundImage: '/images/no-image.png',
          isFavorite: false,
          createdAt: '',
          userId: '',
          lastAccessedAt: '',
        };
      } catch (error) {
        console.error('Error creating board:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while creating the board', life: 3000 });
      }
    }
  }
}
</script>

<template>
  <Button :label="this.$t('navbar.createBoardButton.label')" icon="pi pi-plus" class="p-button-raised p-button-primary"
    @click="isDialogVisible = true" />

  <Dialog v-model:visible="isDialogVisible" modal :header="this.$t('navbar.createBoardButton.dialog.title')" :style="{ width: '25rem' }"
    :closable=false position="center" :draggable="false" @keydown.enter.prevent="createBoard()"
    @keydown.esc.prevent="isDialogVisible = false">
    <div class="flex flex-col gap-4 my-2">
      <FloatLabel variant="on">
        <InputText id="in_label" v-model="boardToCreate.title" autocomplete="off" class="resize-none w-full"
          :maxlength=20 />
        <label for="in_label">{{ this.$t('navbar.createBoardButton.dialog.titleLabel') }}</label>
      </FloatLabel>

      <FloatLabel variant="on">
        <Textarea id="desc" v-model="boardToCreate.description" autocomplete="off" :maxlength=5000 :minlength=10
          class="h-28 resize-none overflow-y-auto w-full overflow-hidden" />
        <label for="desc">{{ this.$t('navbar.createBoardButton.dialog.descriptionLabel') }}</label>
      </FloatLabel>
      <div class="flex justify-end gap-2 mt-4">
        <Button :label="this.$t('navbar.createBoardButton.dialog.cancelButton')" class="p-button-text" @click="isDialogVisible = false" />
        <Button :label="this.$t('navbar.createBoardButton.dialog.createButton')" icon="pi pi-check" class="p-button-primary" @click="createBoard()" />
      </div>
    </div>
  </Dialog>
</template>
