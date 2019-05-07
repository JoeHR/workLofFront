import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Cookies from 'js-cookie'

import i18n from './lang' // Internationalization
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import './icons' // icon  全局组件 
// import './errorLog' // error log
import './permission' // permission control
import './mock'   // mock 模拟请求 全局引入

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key:string, value:any) => i18n.t(key, value)
})

Vue.config.productionTip = false



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
