<script>
import { Button, InputText } from 'primevue';

export default {
  data() {
    return {
      value: "testing"
    }
  },
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    InputText
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
  <InputText type="text" v-model="value" />
  <Button label="Submit" @click="resetName()" icon="pi pi-search">Reset</Button>
</template>
