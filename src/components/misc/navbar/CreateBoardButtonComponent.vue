<!-- eslint-disable vue/no-reserved-component-names -->
<script>
import Button from 'primevue/button';

export default {
  name: 'CreateBoardButtonComponent',
  components: {
    Button
  },
  methods: {
    createBoard() {
      // Logic to create a new board
      console.log('Creating a new board...');
    }
  }
}
</script>

<template>
  <Button
    label="Create Board"
    icon="pi pi-plus"
    class="p-button-raised p-button-primary"
    @click="createBoard"
  />
</template>

