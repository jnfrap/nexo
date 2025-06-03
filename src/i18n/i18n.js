import i18next from 'i18next'
import I18NextVue from 'i18next-vue'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          welcome: 'Welcome to Your Vue.js App',
        }
      },
      es: {
        translation: {
          welcome: 'Bienvenido a tu aplicación Vue.js',
        }
      },
    }
  });

export default function (app) {
  app.use(I18NextVue, { i18next })
  return app
}
