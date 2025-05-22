<script>
import TaskContainerComponent from '@/components/board/TaskContainerComponent.vue';

export default {
  name: 'BoardView',
  components: {
    TaskContainerComponent
  },
  methods: {
  },
}
</script>

<template>
  <h1>Board view</h1>
  <TaskContainerComponent />
</template>
