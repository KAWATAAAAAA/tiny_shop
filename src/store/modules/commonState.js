import {SET_TOKEN} from './mutation-types'

const state = {
  isCartOpen:false,
  token:undefined
}
const getters = {

}
const mutations = {
  [SET_TOKEN](state,token){
    state.token = token
  },
  setIsCartOpen(state){
    state.isCartOpen = !(state.isCartOpen)
  }
}

const actions = {
  setToken(context,token){

    context.commit(SET_TOKEN,token)
  },
  showCart(context){
    context.commit('setIsCartOpen')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
