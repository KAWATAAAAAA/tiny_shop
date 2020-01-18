import {SET_STATUS,REMOVE_STATUS,GET_USERINFO} from './mutation-types'

const state = {
  user:{
    status:false,
    userId:'',
    userNickName:'',
    userRealName:'',
    userPhoneNum:'',
    userBirthday:'',
    userEmail:'',
    defaultAddress:'',
    otheAddresser:[],
  }
}
const getters = {

}
const mutations = {
  [SET_STATUS](state){
    state.user.status = true
  },
  [REMOVE_STATUS](state){
    state.user.status = false
  },
  [GET_USERINFO](state){

  }
}

const actions = {
  setStatus(context){
    context.commit(SET_STATUS)
  },
  removeStatus(context){
    context.commit(REMOVE_STATUS)
  },
  getUserInfo(context){
    context.commit(GET_USERINFO)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
