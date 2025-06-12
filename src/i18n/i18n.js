import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'
import spanish from '@/i18n/translations/es/es.json'
import english from '@/i18n/translations/en/en.json'
import pirate from '@/i18n/translations/en_pi/en_pi.json'
import silboGomero from '@/i18n/translations/es_ca/es_ca.json'

i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: { translation: english },
      es: { translation: spanish },
      en_pi: { translation: pirate },
      es_ca: { translation: silboGomero }
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
