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
      }, 250);
    },
    onOptionSelected(event) {
      this.search({ query: event.value.title });
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
      @input="search({ query: $event.target.value })" placeholder="Search..."
      @option-select="onOptionSelected($event)" />
  </IconField>
</template>
