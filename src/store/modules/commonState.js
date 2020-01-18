import {SET_TOKEN} from './mutation-types'

const state = {
  isCartOpen:false,
  token:undefined
}
const getters = {

}
const mutations = {
  [SET_TOKEN](state,{data}){
    state.token = data
  },
  setIsCartOpen(state){
    state.isCartOpen = !(state.isCartOpen)
  }
}

const actions = {
  setToken(context,{data}){
    context.commit(SET_TOKEN,{data})
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
