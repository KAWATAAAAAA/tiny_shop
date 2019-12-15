import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //store 中唯一的数据来源
    isCartOpen:false
  },
  getters:{ //如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
    getIsCartOpen(state){

      /*
      * 其他组件在访问getIsCartOpen 的时候不需要 getIsCartOpen() 来调用，因为 getIsCartOpen是一个属性，
      * 且它是一个 computed 属性，默认的方法为 get 方法，所以理应 return 一个请求的 state
      * */
      return state.isCartOpen
    }
  },
  mutations: { //类似函数，改变state数据的唯一途径，且不能用于处理异步事件
    setIsCartOpen(state){
      state.isCartOpen = !(state.isCartOpen)
    }

  },
  actions: { //类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
    showCart(context){
      //console.log(context)
      /*
      * 形参本来是{commit} ， 被我改为了 context
      * 我们所需要的是 commit 方法提交mutations，
      * 但commit 是 context 下面的方法，所以context.commit
      *
      * 我的疑问是为什么要加花括号 {commit}，
      * console.log(commit) => 输入了 commit not a  function
      * commit.commit('setIsCartOpen') 也能调用，看样子，dispatch 在入参的时候 是传了一个  context 执行体
      * {} 的作用难道是将对象中的方法解析出来？？？
      * 查了一下为 ES6 语法 变量解构赋值
      * */
      context.commit('setIsCartOpen')
    }
  },
  modules: { //类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

  }
})
