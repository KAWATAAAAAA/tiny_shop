import * as TYPES from './mutation-types'

const state = {
  isCartOpen:false,
  token:undefined,
  goodsInfo:[]
}
const getters = {

}
const mutations = {
  [TYPES.SET_TOKEN](state,token){
    state.token = token
  },
  [TYPES.SET_GOODS_INFO](state,data){
    state.goodsInfo = data
  },
  [TYPES.PUSH_GOODS_INFO](state,data){
    /*分页中 下一页是一个list 所以data是数组类型*/
    data.forEach((item)=>{
      state.goodsInfo.push(item)
    })
  },
  setIsCartOpen(state){
    state.isCartOpen = !(state.isCartOpen)
  }
}

const actions = {
  setToken(context,token){

    context.commit(TYPES.SET_TOKEN,token)
  },
  setGoodsInfo(context,data){
    context.commit(TYPES.SET_GOODS_INFO,data)
  },
  pushGoodsInfo(context,data){
    context.commit(TYPES.PUSH_GOODS_INFO,data)
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
