import {SET_STATUS,REMOVE_STATUS,GET_USERINFO,SET_USERINFO,CLEAR_USERINFO} from './mutation-types'

const state = {
  user:{
    status:false,
    userId:'',
    userNickName:'',
    userRealName:'',
    userPhoneNum:'',
    userBirthday:'',
    userEmail:'',
    userAvatar:'',
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

  },
  [SET_USERINFO](state,{data}){
    state.user.userId = data.userId
    state.user.userBirthday = data.userBirthday
    state.user.userEmail = data.userEmail
    state.user.userNickName = data.userNickName
    state.user.userRealName = data.userRealName
    state.user.userPhoneNum = data.userPhoneNum
    state.user.userAvatar = data.userAvatar
  },
  [CLEAR_USERINFO](state){
    for(let item in state.user)
    {
      if (Array.isArray(item))
        item = []
      if (item instanceof Object)
        item = {}
      if (typeof item === "number")
        item = 0
      if (typeof item === "string")
        item = ""
      if (typeof item === "boolean")
        item = false
    }

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
  },
  setUserInfo(context,{data}){
    context.commit(SET_USERINFO,{data})
  },
  clearUserInfo(context){
    context.commit(CLEAR_USERINFO)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
