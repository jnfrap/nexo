<script>
import Button from 'primevue/button'
import Popover from 'primevue/popover'

export default {
  name: 'NotificationButtonComponent',
  components: {
    AppButton: Button,
    Popover
  },
  computed: {
    notifications() {
      return [
        this.$t('navbar.notificationButton.notification1'),
        this.$t('navbar.notificationButton.notification2'),
        this.$t('navbar.notificationButton.notification3')
      ]
    }
  },
  methods: {
    togglePanel(event) {
      this.$refs.panelRef.toggle(event)
    },
    removeNotification(index) {
      this.notifications.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="relative inline-block">
    <AppButton class="p-button-text p-button-rounded mr-2" aria-label="Notificaciones" @click="togglePanel">
      <span class="relative">
        <i class="pi pi-bell text-xl"></i>
        <span v-if="notifications.length > 0"
          class="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-400 rounded-full border-2 border-white"
          style="transform: translate(25%, -25%);"></span>
      </span>
    </AppButton>

    <Popover ref="panelRef" :dismissable="true" :showCloseIcon="true" style="width: 300px">
      <p v-if="notifications.length === 0" class="text-gray-500 italic">{{ this.$t('navbar.notificationButton.noNotifications') }}</p>
      <ul v-else class="space-y-3">
        <li v-for="(n, index) in notifications" :key="index"
          class="bg-fuchsia-100 text-fuchsia-900 p-3 rounded shadow flex items-center justify-between">
          <span>{{ n }}</span>
          <button @click="removeNotification(index)"
            class="text-pink-500 hover:text-pink-800 transition-colors cursor-pointer"
            aria-label="Eliminar notificación">
            <i class="pi pi-times-circle"></i>
          </button>
        </li>
      </ul>
    </Popover>
  </div>
</template>
