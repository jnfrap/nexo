<script>
import NavBarComponent from './components/misc/navbar/NavBarComponent.vue';
import { ConfirmDialog, Toast } from 'primevue';
import { storage } from './shared/storage';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/config';
import { reorderBoarsdArray } from './shared/utils';

export default {
  name: 'App',
  components: {
    NavBarComponent,
    ConfirmDialog,
    Toast
  },
  mounted() {
    console.log(JSON.parse(JSON.stringify(storage)));
    const boardsCollection = collection(db, "boards");
    onSnapshot(boardsCollection, (querySnapshot) => {
      storage.boards = [];
      storage.filteredBoards = [];
      querySnapshot.forEach((board) => {
        storage.boards.push({
          id: board.id,
          ...board.data()
        });
        storage.filteredBoards.push({
          id: board.id,
          ...board.data()
        });
      });
      storage.boards = reorderBoarsdArray(storage.boards);
      storage.filteredBoards = reorderBoarsdArray(storage.filteredBoards);
    });
  },
}
</script>

<template>
  <NavBarComponent @board-created="loadBoards" />
  <RouterView />
  <ConfirmDialog :draggable="false"></ConfirmDialog>
  <Toast></Toast>
</template>
