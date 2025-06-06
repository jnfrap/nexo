<script>
import { Button, Menu } from 'primevue'

export default {
  name: 'LanguageSelectorComponent',
  components: {
    Button,
    Menu
  },
  computed: {
    menuItems() {
      return [
        {
          label: this.$t('navbar.chooseLanguage'),
          items: [
            {
              label: 'English',
              icon: 'fi fi-gb',
              command: () => { this.changeLanguage('en'); }
            },
            {
              label: 'Español',
              icon: 'fi fi-es',
              command: () => { this.changeLanguage('es'); }
            },
            {
              label: '🏴‍☠️ Arrr!',
              command: () => { this.changeLanguage('en_pi'); }
            }
          ]
        }
      ]
    }
  },
  methods: {
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    changeLanguage(language) {
      this.$i18next.changeLanguage(language);
    },
    getCurrentLanguage() {
      return this.$i18next.language;
    }
  }
}
</script>

<template>
  <Button @click.stop="toggleMenu($event)">
    <template v-if="!getCurrentLanguage()">
      <i class="pi pi-language" />
    </template>
    <template v-else-if="getCurrentLanguage() === 'en'">
      <i class="fi fi-gb" />
    </template>
    <template v-else-if="getCurrentLanguage() === 'es'">
      <i class="fi fi-es" />
    </template>
    <template v-else-if="getCurrentLanguage() === 'en_pi'">
      <span class="text-xl">🏴‍☠️</span>
    </template>
    <template v-else>
      <i class="pi pi-language" />
    </template>
  </Button>

  <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
</template>
