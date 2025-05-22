<script>
import { storage } from '@/shared/storage';
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
        console.log('Filtered boards:', storage.filteredBoards);
        console.log('All boards:', storage.boards);
      }, 250);
    }
  },
  mounted() {
    this.boards = storage.boards;
    this.filteredBoards = this.boards;
  },
}
</script>

<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <AutoComplete v-model="selectecBoard" optionLabel="title" :suggestions="filteredBoards" @complete="search($event)"
      placeholder="Search..." />
  </IconField>
</template>
