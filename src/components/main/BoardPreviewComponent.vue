<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { Button, FloatLabel } from 'primevue';
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { storage } from '../../shared/storage.js'
import { reorderBoarsdArray } from '@/shared/utils';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { updateBoard } from '@/shared/services/boardService';

export default {
  name: 'BoardPreviewComponent',
  data() {
    return {
      isHovered: false,
      localBoard: {},
      boards: [],
      editDialogVisible: false,
      editTitle: '',
      editDescription: '',
      storage: storage,
    }
  },
  computed: {
    menuItems() {
      return [
        {
          label: this.$t('mainView.boardPreviewMenu.editButton'),
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.openEditDialog();
          }
        },
        {
          label: this.$t('mainView.boardPreviewMenu.deleteButton'),
          icon: 'pi pi-fw pi-trash',
          command: () => {
            this.confirmDeletion();
          }
        }
      ];
    }
  },
  emits: ['delete-board', 'edit-board'],
  components: {
    Menu,
    Button,
    ContextMenu,
    Dialog,
    InputText,
    Textarea,
    FloatLabel
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async toggleFavorite() {
      const board = this.boards.find(b => b.id === this.localBoard.id);
      if (board) {
        board.isFavorite = !board.isFavorite;
        this.localBoard.isFavorite = board.isFavorite;
        this.boards = reorderBoarsdArray(this.boards);
        this.storage.filteredBoards = reorderBoarsdArray(this.storage.filteredBoards);
        this.storage.boards = this.boards;
        await updateBoard(board);
      }
    },
    async goToBoard() {
      this.localBoard.lastAccessedAt = new Date().toISOString();
      const boardIndex = this.boards.findIndex(b => b.id === this.localBoard.id);
      if (boardIndex !== -1) {
        this.boards.splice(boardIndex, 1);
        this.boards.unshift(this.localBoard);
        this.storage.boards = this.boards;
      }
      await updateBoard(this.localBoard);
      console.log(this.localBoard)
      this.$router.push({ name: 'board', params: { boardId: this.localBoard.id } });
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    confirmDeletion() {
      this.$confirm.require({
        message: `${this.$t('mainView.boardPreviewMenu.deleteDialog.message')} ${this.localBoard.title}?`,
        header: this.$t('mainView.boardPreviewMenu.deleteDialog.title'),
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: this.$t('mainView.boardPreviewMenu.deleteDialog.cancelButton'),
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: this.$t('mainView.boardPreviewMenu.deleteDialog.confirmButton'),
          severity: 'danger',
        },
        accept: () => {
          this.$emit('delete-board', this.localBoard.id);
        }
      });
    },
    openEditDialog() {
      this.editTitle = this.localBoard.title;
      this.editDescription = this.localBoard.description || '';
      this.editDialogVisible = true;
    },
    saveEdit() {
      this.localBoard.title = this.editTitle;
      this.localBoard.description = this.editDescription;
      const board = this.boards.find(b => b.id === this.localBoard.id);
      if (board) {
        board.title = this.editTitle;
        board.description = this.editDescription;
        this.storage.boards = this.boards;
        updateBoard(board);
      }
      this.editDialogVisible = false;
      this.$emit('edit-board', this.localBoard);
    }
  },
  created() {
    this.boards = this.storage.boards;
    this.localBoard = this.board;
  },
  watch: {
    board: {
      immediate: true,
      handler(newVal) {
        this.localBoard = { ...newVal };
      }
    }
  },
}
</script>

<template>
  <div class="w-64 h-40 rounded-lg relative overflow-hidden cursor-pointer" @click="goToBoard()"
    @mouseenter="isHovered = true" @mouseleave="isHovered = false" @contextmenu="toggleMenu($event)"
    :style="{ backgroundImage: `url(${localBoard.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">

    <div class="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
      :class="isHovered ? 'opacity-0' : 'opacity-100'"></div>

    <div class="absolute top-2 right-2 flex space-x-2">
      <button class="text-yellow-400 focus:outline-none cursor-pointer" @click.stop="toggleFavorite()">
        <i v-if="localBoard.isFavorite" class="pi pi-star-fill" title="Unfavorite" style="font-size: 1.5rem"></i>
        <i v-else class="pi pi-star" title="Favorite" style="font-size: 1.5rem"></i>
      </button>

      <Button type="button" @click.stop="toggleMenu($event)" aria-haspopup="true" aria-controls="overlay_menu" unstyled
        class="cursor-pointer text-white">
        <i class="pi pi-ellipsis-h" style="font-size: 1rem"></i>
      </Button>
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
    </div>

    <ContextMenu ref="menu" :model="menuItems" />

    <div class="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black to-transparent">
      <h2 class="font-bold transition-all duration-300" :class="isHovered ? 'text-2xl' : 'text-lg'">
        {{ localBoard.title }}
      </h2>
    </div>
    <Dialog v-model:visible="editDialogVisible" modal :header="this.$t('mainView.boardPreviewMenu.editDialog.title')" :style="{ width: '25rem' }"
      :closable="true" position="center" :draggable="false" @keydown.enter.prevent="saveEdit()"
      @keydown.esc.prevent="editDialogVisible = false">
      <div class="flex flex-col gap-4 my-2">
        <FloatLabel variant="on">
          <InputText id="edit_title" v-model="editTitle" autocomplete="off" class="resize-none w-full"
            :maxlength="20" />
          <label for="edit_title">{{ this.$t('mainView.boardPreviewMenu.editDialog.titleLabel') }}</label>
        </FloatLabel>

        <FloatLabel variant="on">
          <Textarea id="edit_desc" v-model="editDescription" autocomplete="off" :maxlength="5000" :minlength="10"
            class="h-28 resize-none overflow-y-auto w-full overflow-hidden" />
          <label for="edit_desc">{{ this.$t('mainView.boardPreviewMenu.editDialog.descriptionLabel') }}</label>
        </FloatLabel>
        <div class="flex justify-end gap-2 mt-4">
          <Button :label="this.$t('mainView.boardPreviewMenu.editDialog.cancelButton')" class="p-button-text" @click="editDialogVisible = false" />
          <Button :label="this.$t('mainView.boardPreviewMenu.editDialog.saveButton')" icon="pi pi-check" class="p-button-primary" @click="saveEdit()" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
