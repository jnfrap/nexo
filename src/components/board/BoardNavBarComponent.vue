<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import { getBoardByID } from '@/shared/services/boardService';
import { Button, Menu } from 'primevue';

export default {
  name: 'BoardNavBarComponent',
  data() {
    return {
      board: {},
    };
  },
  computed: {
    menuItems() {
      return [
        {
          label: this.$t('boardView.navbar.menu.label'),
          items: [
            {
              label: this.$t('boardView.navbar.menu.editTitle'),
              icon: 'pi pi-fw pi-pencil',
              command: () => {
                // Add logic to edit the task
              }
            },
            {
              label: this.$t('boardView.navbar.menu.changeBackground'),
              icon: 'pi pi-fw pi-image',
              command: () => {
                // Add logic to delete the board
              }
            },
            {
              label: 'Share board',
              icon: 'pi pi-fw pi-share-alt',
              command: () => {
                // Add logic to share the board
              }
            },
            {
              label: 'Archive board',
              icon: 'pi pi-fw pi-box',
              command: () => {
                // Add logic to archive the board
              }
            },
            {
              label: 'Delete board',
              icon: 'pi pi-fw pi-trash',
              command: () => {
                // Add logic to delete the board
              }
            }
          ]
        }
      ];
    }
  },
  components: {
    Button,
    Menu
  },
  methods: {
    async goBack() {
      this.$router.push('/');
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
  },
  async mounted() {
    const boardId = this.$route.params.boardId;
    this.board = await getBoardByID(boardId);
  },
};
</script>

<template>
  <div class="flex items-center justify-between px-6 h-[50px] bg-[#b0b0b094] shadow-md mb-5">
    <div class="flex items-center gap-4">
      <Button class="text-white cursor-pointer mt-1.5" icon="pi pi-arrow-left" @click="goBack"
        aria-label="Back to boards" unstyled />
      <h1 class="text-white text-2xl p-0">{{ board.title }}</h1>
      <div class="text-yellow-400 mt-1.5">
        <i v-if="board.isFavorite" class="pi pi-star-fill" title="Favorite" style="font-size: 1.5rem"></i>
        <i v-else class="pi pi-star" title="No favorite" style="font-size: 1.5rem"></i>
      </div>
    </div>
    <Button type="button" @click.stop="toggleMenu($event)" aria-haspopup="true" aria-controls="overlay_menu" unstyled
      class="cursor-pointer">
      <i class="pi pi-ellipsis-h text-white" style="font-size: 1rem"></i>
    </Button>
  </div>

  <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
</template>
