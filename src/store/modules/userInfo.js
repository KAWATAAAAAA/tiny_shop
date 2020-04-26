import * as TYPES from './mutation-types'
import Api from '../../api'
import LS from '../../static/js/LogStyle'
const state = {
  user:{
    status:false,
    isSaler:false,
    userId:'',
    userNickName:'',
    userRealName:'',
    userGender:"",
    userIntro:"",
    userPhoneNum:'',
    userBirthday:'',
    userEmail:'',
    userAvatar:'',
    defaultAddress:'',
    otheAddresser:[],
  }
}
const getters = {
  getUserInfo(state){
    return state.user
  }
}
const mutations = {
  [TYPES.SET_STATUS](state){
    console.log("%c 设置状态被调用",LS.lightRed)
    state.user.status = true
  },
  [TYPES.REMOVE_STATUS](state){
    state.user.status = false
  },
  [TYPES.GET_USERINFO](state){

  },
  [TYPES.SET_USERINFO](state,data){
  /*
  *   state.user.userId = data.userId
    state.user.userBirthday = data.userBirthday
    state.user.userEmail = data.userEmail
    state.user.userNickName = data.userNickName
    state.user.userRealName = data.userRealName
    state.user.userPhoneNum = data.userPhoneNum
    state.user.userAvatar = data.userAvatar
    state.user.userGender = data.userGender
    state.user.userIntro = data.userIntro
  * */
    for (let item in data)
    {
      state.user[item] = data[item]
    }
  },
  [TYPES.CLEAR_USERINFO](state){
    for(let item in state.user)
    {
      if (Array.isArray(state.user[item] ))
      {
        state.user[item] = []
      }
      if (state.user[item]  instanceof Object)
      {
        state.user[item]  = {}
      }
      if (typeof state.user[item]  === "number")
      {
        state.user[item]  = 0
      }
      if (typeof state.user[item]  === "string")
      {
        state.user[item]  = ""
      }
      if (typeof state.user[item]  === "boolean")
      {
        state.user[item]  = false
      }
    }

  }
}

const actions = {
  setStatus(context){
    context.commit(TYPES.SET_STATUS)
  },
  removeStatus(context){
    context.commit(TYPES.REMOVE_STATUS)
  },
  getUserInfo(context){
    context.commit(TYPES.GET_USERINFO)
  },
  setUserInfo(context){
    console.log("1 请求用户数据")
    return new Promise((resolve, reject) => {
      Api.getUserInfo().then(res=>{
        if (res && res.code === 200)
        {
          console.log("2 用户数据来了")
          context.commit(TYPES.SET_USERINFO,res.data)
          context.commit(TYPES.SET_STATUS)
          resolve(res)
        }
      }).catch(err=>{
        reject(err)
      })
    })


  },
  clearUserInfo(context){
    context.commit(TYPES.CLEAR_USERINFO)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
