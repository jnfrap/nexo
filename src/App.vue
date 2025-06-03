<script>
import NavBarComponent from './components/misc/navbar/NavBarComponent.vue';
import { ConfirmDialog, Toast } from 'primevue';
import { storage } from './shared/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase/config';
import { reorderBoarsdArray } from './shared/utils';

export default {
  name: 'App',
  components: {
    NavBarComponent,
    ConfirmDialog,
    Toast
  },
  data() {
    return {
      unsubscribeSnapshot: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (this.unsubscribeSnapshot) {
        this.unsubscribeSnapshot();
        this.unsubscribeSnapshot = null;
      }

      if (user) {
        const boardsCollectionRef = collection(db, "boards");
        const userBoardsQuery = query(boardsCollectionRef, where("userId", "==", user.uid));

        this.unsubscribeSnapshot = onSnapshot(userBoardsQuery, (querySnapshot) => {
          const boardsList = [];
          querySnapshot.forEach((boardDoc) => {
            boardsList.push({
              id: boardDoc.id,
              ...boardDoc.data()
            });
          });

          storage.boards = reorderBoarsdArray(boardsList);
          storage.filteredBoards = reorderBoarsdArray(boardsList);
        }, (error) => {
          console.error('Error ocurred while getting boards', error);
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al obtener los tableros.', life: 3000 });
        });
      } else {
        storage.boards = [];
        storage.filteredBoards = [];
      }
    });
  },
  beforeUnmount() {
    if (this.unsubscribeSnapshot) {
      this.unsubscribeSnapshot();
    }
  }
}
</script>

<template>
  <NavBarComponent />
  <RouterView />
  <ConfirmDialog :draggable="false"></ConfirmDialog>
  <Toast></Toast>
</template>
