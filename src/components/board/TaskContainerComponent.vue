<script>
export default {
  name: 'BoardView',
  props: {
    taskGroup: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="w-80 rounded-xl p-4 bg-[#f1f2f4] shadow-lg">
    <h2 class="text-lg">{{ taskGroup.title }}</h2>
  </div>
</template>
