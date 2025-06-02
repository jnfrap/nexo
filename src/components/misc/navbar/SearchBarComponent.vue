<script>
import { ErrorCodes } from '@/shared/enums';
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
      storage: storage,
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
          this.storage.filteredBoards = [...this.storage.boards];
        } else {
          this.storage.filteredBoards = this.storage.boards.filter((b) => {
            return b.title.toLowerCase().includes(event.query.toLowerCase());
          });
        }
      }, 250);
    },
    onOptionSelected(event) {
      this.search({ query: event.value.title });
    }
  },
  async mounted() {
    try {
      // storage.boards = await getBoards();
      console.log('Boards loaded:', this.storage.boards);
      this.storage.filteredBoards = this.storage.boards;
    } catch (error) {
      if (error.code !== ErrorCodes.NOT_FOUND) {
        console.error('Error fetching boards:', error);
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'An unexpected error occurred while loading boards', life: 3000 });
      }
    }
  },
}
</script>

<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <AutoComplete v-model="selectecBoard" optionLabel="title" :suggestions="storage?.filteredBoards" @complete="search($event)"
      @input="search({ query: $event.target.value })" placeholder="Search..."
      @option-select="onOptionSelected($event)" />
  </IconField>
</template>
