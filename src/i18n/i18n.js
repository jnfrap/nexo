import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import spanish from '@/i18n/translations/es/es.json'
import english from '@/i18n/translations/en/en.json'

i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: { translation: english },
      es: { translation: spanish },
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
