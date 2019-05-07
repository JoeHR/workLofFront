import Vue from 'vue'
import VueIl8n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocale from 'element-ui/lib/locale/lang/es'
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'


Vue.use(VueIl8n)

const messages:any = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  }
}

const il8n = new VueIl8n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'en',
  // set locale messages
  messages
})

export default il8n