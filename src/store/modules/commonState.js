import {SET_TOKEN,SET_GOODS_INFO} from './mutation-types'

const state = {
  isCartOpen:false,
  token:undefined,
  goodsInfo:[]
}
const getters = {

}
const mutations = {
  [SET_TOKEN](state,token){
    state.token = token
  },
  [SET_GOODS_INFO](state,data){
    state.goodsInfo = data
  },
  setIsCartOpen(state){
    state.isCartOpen = !(state.isCartOpen)
  }
}

const actions = {
  setToken(context,token){

    context.commit(SET_TOKEN,token)
  },
  setGoodsInfo(context,data){
    context.commit(SET_GOODS_INFO,data)
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
