<script>
export default {
  name: 'BoardPreviewComponent',
  data() {
    return {
      localTitle: '',
      localBackgroundImage: '',
      localIsFavorite: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Default title'
    },
    backgroundImage: {
      type: String,
      default: '/images/no-image.jpg'
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.localTitle = this.title;
    this.localBackgroundImage = this.backgroundImage;
    this.localIsFavorite = this.isFavorite;
  },
  methods: {
    toggleFavorite() {
      this.localIsFavorite = !this.localIsFavorite;
    },
    goToBoard() {
      console.log(this.id);
      // Here use Vue Router to navigate to the board page
    }
  }
}
</script>

<template>
  <div class="w-64 h-40 rounded-lg relative overflow-hidden cursor-pointer" @click="goToBoard()"
    :style="{ backgroundImage: `url(${localBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <div class="absolute inset-0 backdrop-blur-sm"></div>

    <button class="absolute top-2 right-2 text-yellow-400 text-4xl focus:outline-none cursor-pointer"
      @click.stop="toggleFavorite()">
      <span v-if="localIsFavorite" title="Unfavorite">★</span>
      <span v-else title="Favorite">☆</span>
    </button>

    <div class="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black to-transparent">
      <h2 class="text-lg font-bold">{{ localTitle }}</h2>
    </div>

  </div>
</template>
