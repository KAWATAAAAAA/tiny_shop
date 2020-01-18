import Vue from 'vue'
import Vuex from 'vuex'

import userInfo from './modules/userInfo'
import commonState from './modules/commonState'
Vue.use(Vuex)



export default new Vuex.Store({
  modules:{
    userInfo,
    commonState
  }
})
