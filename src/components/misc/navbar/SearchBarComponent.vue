<script>
import { db } from '@/firebase/config';
import { ErrorCodes } from '@/shared/enums';
import { getBoards } from '@/shared/services/boardService';
import { storage } from '@/shared/storage';
import { collection, onSnapshot } from 'firebase/firestore';
import AutoComplete from 'primevue/autocomplete';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

export default {
  name: 'SearchBarComponent',
  data() {
    return {
      selectecBoard: {
        id: null,
        title: '',
        backgroundImage: '',
        isFavorite: false,
      },
      boards: [],
      filteredBoards: [],
    }
  },
  components: {
    AutoComplete,
    IconField,
    InputIcon
  },
  methods: {
    search(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredBoards = [...this.boards];
        } else {
          this.filteredBoards = this.boards.filter((b) => {
            return b.title.toLowerCase().includes(event.query.toLowerCase());
          });
        }
        storage.filteredBoards = this.filteredBoards;
      }, 250);
    },
    onOptionSelected(event) {
      this.search({ query: event.value.title });
    }
  },
  async mounted() {
    try {
      this.boards = await getBoards();
      console.log('Boards loaded:', this.boards);
      this.filteredBoards = this.boards;
    } catch (error) {
      if (error.code !== ErrorCodes.NOT_FOUND) {
        console.error('Error fetching boards:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred while loading boards', life: 3000 });
      }
    }

    const boardsCollection = collection(db, "boards");
    onSnapshot(boardsCollection, (querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((board) => {
        this.boards.push({
          id: board.id,
          ...board.data()
        });
      });
    });
  },
}
</script>

<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <AutoComplete v-model="selectecBoard" optionLabel="title" :suggestions="filteredBoards" @complete="search($event)"
      @input="search({ query: $event.target.value })" placeholder="Search..."
      @option-select="onOptionSelected($event)" />
  </IconField>
</template>
