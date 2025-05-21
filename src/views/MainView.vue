<script>
import BoardPreviewComponent from '@/components/main/BoardPreviewComponent.vue';

export default {
  data() {
    return {
      value: "testing"
    }
  },
  components: {
    BoardPreviewComponent
  },
  methods: {
    resetName() {
      this.value = "testing";
    }
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold text-center text-blue-600 my-8">Main view</h1>
  <BoardPreviewComponent />
</template>
