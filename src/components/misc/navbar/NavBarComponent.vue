<script>
import { useRoute } from 'vue-router';
import CreateBoardButtonComponent from './CreateBoardButtonComponent.vue';
import { computed } from 'vue';
import SearchBarComponent from './SearchBarComponent.vue';
import RecentBoardsComponent from './RecentBoardsComponent.vue';
import UserProfileComponent from './UserProfileComponent.vue';
import { navHeight } from '@/shared/constants';
import NotificationButtonComponent from './NotificationButtonComponent.vue';
import LanguageSelectorComponent from './LanguageSelectorComponent.vue';

export default {
  name: 'NavBarComponent',
  components: {
    CreateBoardButtonComponent,
    UserProfileComponent,
    SearchBarComponent,
    RecentBoardsComponent,
    NotificationButtonComponent,
    LanguageSelectorComponent
  },
  data() {
    return {
      navHeight: navHeight,
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
  <div :class="`h-[70px]`"></div>
  <div :class="`w-full h-[70px] bg-[#4b164c] p-[5px] flex justify-center box-border fixed top-0 z-[1000]`">
    <div class="h-full w-[90%] flex justify-between select-none">
      <div class="flex flex-row justify-start">
        <RouterLink to="/">
          <div class="h-full flex justify-center items-end w-fit">
            <img src="/branding/Nx.png" alt="Logo de Nexo" class="h-full" />
            <p class="mb-[5px] text-white text-[35px] font-[Raleway]">Nexo</p>
          </div>
        </RouterLink>
        <div class="w-6"></div>
        <div class="flex items-center gap-[10px]">
          <CreateBoardButtonComponent v-if="currentPath === '/'" />
          <div class="w-3"></div>
          <RecentBoardsComponent v-if="currentPath === '/'" />
        </div>
      </div>

      <div class="flex items-center gap-[10px] w-fit">
        <LanguageSelectorComponent />
        <SearchBarComponent v-if="currentPath === '/'" />
        <NotificationButtonComponent v-if="currentPath !== '/auth'" />
        <UserProfileComponent v-if="currentPath !== '/auth'" />
      </div>
    </div>
  </div>
</template>
