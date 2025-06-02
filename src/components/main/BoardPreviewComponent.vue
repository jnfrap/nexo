<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { Button, FloatLabel } from 'primevue';
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { storage } from '@/shared/storage.js'
import { reorderBoarsdArray, saveBoardToRecentsBoards, removeFromRecentsBoards } from '@/shared/utils';
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
      menuItems: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.openEditDialog();
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
    toggleFavorite() {
      const board = this.boards.find(b => b.id === this.localBoard.id);
      if (board) {
        board.isFavorite = !board.isFavorite;
        this.localBoard.isFavorite = board.isFavorite;
        this.boards = reorderBoarsdArray(this.boards);
        storage.filteredBoards = reorderBoarsdArray(storage.filteredBoards);
        storage.boards = this.boards;
        updateBoard(board);
      }
    },
    goToBoard() {
      saveBoardToRecentsBoards({
        id: this.localBoard.id,
        name: this.localBoard.title,
        icon: this.localBoard.icon
      });
      this.$router.push({ name: 'board', params: { boardId: this.localBoard.id } });
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    confirmDeletion() {
      this.$confirm.require({
        message: `Are you sure you want to delete the board ${this.localBoard.title}?`,
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
          removeFromRecentsBoards(this.localBoard.id);
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
        storage.boards = this.boards;
        updateBoard(board);
      }
      this.editDialogVisible = false;
      this.$emit('edit-board', this.localBoard);
    }
  },
  created() {
    this.boards = storage.boards;
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
    <Dialog v-model:visible="editDialogVisible" modal header="Editing board" :style="{ width: '25rem' }"
      :closable="true" position="center" :draggable="false" @keydown.enter.prevent="saveEdit()"
      @keydown.esc.prevent="editDialogVisible = false">
      <div class="flex flex-col gap-4 my-2">
        <FloatLabel variant="on">
          <InputText id="edit_title" v-model="editTitle" autocomplete="off" class="resize-none w-full"
            :maxlength="20" />
          <label for="edit_title">Title</label>
        </FloatLabel>

        <FloatLabel variant="on">
          <Textarea id="edit_desc" v-model="editDescription" autocomplete="off" :maxlength="5000" :minlength="10"
            class="h-28 resize-none overflow-y-auto w-full overflow-hidden" />
          <label for="edit_desc">Description</label>
        </FloatLabel>
        <div class="flex justify-end gap-2 mt-4">
          <Button label="Cancel" class="p-button-text" @click="editDialogVisible = false" />
          <Button label="Save" icon="pi pi-check" class="p-button-primary" @click="saveEdit()" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
