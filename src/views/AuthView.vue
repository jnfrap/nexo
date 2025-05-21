<script>
import FormComponent from '../components/auth/FormComponent.vue';


export default {
  name: 'AuthView',
  components: {
    FormComponent
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-fuchsia-50">
    <FormComponent/>
  </div>
</template>
