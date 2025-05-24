<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { Button } from 'primevue';
import Menu from 'primevue/menu';
import ContextMenu from 'primevue/contextmenu';
import { storage } from '@/shared/storage.js'
import { reorderBoarsdArray, saveToRecents } from '@/shared/utils';

export default {
  name: 'BoardPreviewComponent',
  data() {
    return {
      isHovered: false,
      localBoard: {},
      boards: [],
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
            this.confirmDeletion();
          }
        }
      ]
    }
  },
  emits: ['delete-board'],
  components: {
    Menu,
    Button,
    ContextMenu
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
        localStorage.setItem('boards', JSON.stringify(this.boards));
      }
    },
    goToBoard() {
      saveToRecents({
        id: this.localBoard.id,
        name: this.localBoard.title, // o .name si existe
        icon: this.localBoard.icon // si tienes icono
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
          this.$emit('delete-board', this.localBoard.id);
        }
      });
    },
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

  </div>
</template>
