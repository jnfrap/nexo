<script>
import { languages } from '@/shared/constants'
import { Button } from 'primevue'

export default {
  name: 'LanguageSelectorComponent',
  components: {
    Button
  },
  data() {
    return {
      languages: languages
    }
  },
  methods: {
    changeLanguage(language) {
      this.$i18n.locale = language
      this.$toast.add({ severity: 'success', summary: 'Language Changed', detail: `Language changed to ${language}`, life: 3000 })
    }
  }
}
</script>

<template>
  <Button>
    <i class="pi pi-language" />
  </Button>
</template>
