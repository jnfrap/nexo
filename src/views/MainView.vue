<script>
import BoardPreviewComponent from '@/components/main/BoardPreviewComponent.vue';

export default {
  data() {
    return {
      value: "testing",
      boards: []
    }
  },
  components: {
    BoardPreviewComponent
  },
  methods: {
    resetName() {
      this.value = "testing";
    }
  },
  mounted() {
    this.boards = [
      {
        id: 1,
        title: 'Board 1',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 2,
        title: 'Board 2',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 3,
        title: 'Board 3',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 4,
        title: 'Board 4',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 5,
        title: 'Board 5',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 6,
        title: 'Board 6',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 7,
        title: 'Board 7',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      },
      {
        id: 8,
        title: 'Board 8',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: true
      },
      {
        id: 9,
        title: 'Board 9',
        backgroundImage: '/images/no-image.jpg',
        isFavorite: false
      }
    ];
  }
}
</script>

<template>
  <div class="w-4/5 mx-auto flex flex-col items-center py-10">
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
    <div v-for="board in boards" :key="board.id">
      <BoardPreviewComponent
        :id="board.id"
        :title="board.title"
        :backgroundImage="board.backgroundImage"
        :isFavorite="board.isFavorite"
      />
    </div>
  </div>
  </div>
</template>
