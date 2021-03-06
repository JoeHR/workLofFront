import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import getters from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    errorLog,
    tagsView,
    permission
  },
  getters
})
