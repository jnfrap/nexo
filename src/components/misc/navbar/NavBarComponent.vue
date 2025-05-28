<script>
import { useRoute } from 'vue-router';
import CreateBoardButtonComponent from './CreateBoardButtonComponent.vue';
import { computed } from 'vue';
import SearchBarComponent from './SearchBarComponent.vue';
import NotificationButtonComponent from './NotificationButtonComponent.vue';

export default {
  name: 'NavBarComponent',
  components: {
    CreateBoardButtonComponent,
    SearchBarComponent,
    NotificationButtonComponent
  },
  data() {
    return {
      isRouteInMain: false,
    }
  },
  setup() {
    const route = useRoute()
    const currentPath = computed(() => route.fullPath)

    return { currentPath }
  }
}
</script>

<template>
  <div class="h-[70px]"></div>
  <div class="w-full h-[70px] bg-[#4b164c] p-[5px] flex justify-center box-border fixed top-0 z-[1000]">
    <div class="h-full w-[70%] flex justify-between select-none">
      <div class="flex flex-row justify-start">
        <RouterLink to="/">
          <div class="h-full flex justify-center items-end w-fit">
            <img src="/branding/Nx.png" alt="Logo de Nexo" class="h-full" />
            <p class="mb-[5px] text-white text-[35px] font-[Raleway]">Nexo</p>
          </div>
        </RouterLink>
        <div class="w-6"></div>
        <CreateBoardButtonComponent v-if="currentPath === '/'" />
        <!-- Recent boards button -->
      </div>

      <div class="flex items-center gap-[10px] w-fit">
        <SearchBarComponent />
        <NotificationButtonComponent />
        <!-- User component -->
      </div>
    </div>
  </div>
</template>
