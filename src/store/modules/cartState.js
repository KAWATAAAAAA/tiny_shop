import * as TYPES from './mutation-types'
import Api from '../../api'
import {Message} from 'element-ui'

const state = {
  storeInfo:[
    {
      storeId:'',
      storeName:'',
      checked:false,
      goodsInfo:[]
    }
  ]
}
const getters = {
  totalPriceGetter(state){
    let price = 0
    state.storeInfo.forEach((store)=>{
      store.goodsInfo.forEach((goods)=>{
        if (goods.checked)
          price += goods.goodsPrice * goods.num
      })
    })
    return price
  },
  totalItemGetter(state){
    let length = 0
    state.storeInfo.forEach((store)=>{
      length += store.goodsInfo.length
    })

    return length
  },
  beCheckedArrGetter(state){
    let storeArr = state.storeInfo
    let beCheckedArr = []


    for(const store of storeArr){
      let goodsArr = store.goodsInfo
      let filterArr = goodsArr.filter((item)=> item.checked === true)
      beCheckedArr.push(...filterArr)
      /*
      * beCheckedArr = beCheckedArr.concat(filterArr) //返回一个新的数组，并不改变原有数组，所以要赋值一次
      * */
    }

    return beCheckedArr
  }
}
const mutations = {
  stateInit(state){
    state.storeInfo = []
  },
  [TYPES.SET_CART_STATE](state,list){
    //指向本地vuex数据
    let storeArr = state.storeInfo
    // 指向API数据
    for (const goods of list){
      /*
      * 当商店列表无数据时
      * storeArr 下新增一个对象
      * 该对象下 goodsInfo[] 新增一条商品信息
      * */
      let item
      if (storeArr.length === 0 )
      {
        item = {...goods}
        item.checked = false
        storeArr.push({
          storeId:goods.storeId,
          storeName:goods.storeName,
          checked:false,
          goodsInfo:[item]
        })
      }
      /*
      * 当商店列表有数据时
      * 先判断是不是属于该商店
      * （属于则直接往商店下 goodsInfo[] push 一条信息）
      * （不属于则 往商店下 push 一个新对象，再对该新对象下的 goodsInfo[] push 一条新信息）
      * */

      for(const store of storeArr){

        if (goods.storeId === store.storeId && !(store.goodsInfo.includes(item))){
          //商店相同，并且goodsInfo中不存在即将push的数据

          goods.checked = false
          store.goodsInfo.push({
            ...goods
          })
          break
        }else if(goods.storeId !== store.storeId){
          // 商店不同,直接push
          goods.checked = false
          item = {
            storeId:goods.storeId,
            storeName:goods.storeName,
            checked:false,
            goodsInfo:[{...goods}]
          }
          storeArr.push(item)
          break
        }
        else {
          break
        }
      }
    }

  },
  [TYPES.ADD_TO_CART_STATE](state,data){
    let deepCopy = JSON.parse(JSON.stringify(data))
    // 先查找storeInfo 中是否存在对应的商店,不存在的处理如下：
    let store = state.storeInfo

    if(!(store.find((item) => item.storeId === deepCopy.storeId))) {
      deepCopy.num = 1
      deepCopy.checked = false
      store.push({
        storeId:deepCopy.storeId,
        storeName:deepCopy.storeName,
        checked:false,
        goodsInfo:[deepCopy]
      })
    }
    else{
      // 存在的处理, 再次检查商店中对应的商品存不存在：

      let elem = state.storeInfo.find((item,i)=>
        item.storeId === deepCopy.storeId
      )
      let flag = false
      elem.goodsInfo.forEach((item)=>{
        // 若对应的商品存在：
        if (item.goodsId === deepCopy.goodsId) {
          item.num++  //存在则直接自增
          flag = true
        }
      })
      // 存在说明已经自增，return
      // 不操作说明需要 push 新增
      if(flag)
        return undefined
      else{
        deepCopy.num = 1
        deepCopy.checked = false
        elem.goodsInfo.push(deepCopy)
      }

    }


  },
  [TYPES.SET_STORE_CHECKED](state,store){
    store.checked = !store.checked
  },
  [TYPES.SET_GOODS_CHECKED](state,storeObj){
    if (storeObj.checked)
      storeObj.goodsInfo.forEach((item)=>{
        item.checked = true
      })
    else
      storeObj.goodsInfo.forEach((item)=>{
        item.checked = false
      })
  },
  [TYPES.INCRE_GOODS_NUM](state,goods){
    goods.num++
  },
  [TYPES.DECRE_GOODS_NUM](state,goods){
    if (goods.num === 1){
      // 找出所属店铺-
      let store = state.storeInfo.find((store)=> store.storeId === goods.storeId )
      // 在店铺中找出对应商品，移除
      store.goodsInfo.forEach((item,index)=>{
        if (item === goods){
          store.goodsInfo.splice(index,1)
         // return undefined
        }
      })
      // 若店铺下再无其它商品，将店铺移除
      if (store.goodsInfo.length === 0)
        state.storeInfo.forEach((item,index)=>{
          if (store === item)
            state.storeInfo.splice(index,1)
        })
    }
    else
      goods.num--
  }
}
const actions = {
  async addToCartState(context,data){
    /*
    * 首先判断传过来的 goods data 是否存在于 storeInfo 中
    * 若不存在，调用接口 post > insert
    * 若存在，调用接口 patch > update
    * */
    let storeArr = context.state.storeInfo
    let store = storeArr.find((item)=> item.storeId === data.storeId)

    try{
      let has = undefined
      /*
      * 假设购物车里有这个商店的记录
      * 遍历这个商店，看能否找到已经添加的商品
      *   有则触发 try中更新
      *   无则触发 try中插入
      * */

      /*
      * 此处不能用 forEach 的 callback 去执行Api
      * 异步请求属于不确定性的数据获取，此次Api还没结束，就到了 try 中的if
      * if 执行就会报错。（附上await无效）
      * 无效的原因在于 callback 也是一个函数，就算将其命名为 async ()=>{} 也无济于事
      * 因为这个新的匿名 callback 又排队进入了浏览器的事件循环队列，因此总是会在 try 中的if执行后得到数据
      * 而得到的这个数据往往是不准确的
      *
      * 因此改为普通的的 for 遍历
      * */
      for (let i = 0; i < store.goodsInfo.length ; i++ ){
        if (store.goodsInfo[i].goodsId === data.goodsId){
          // id相同触发更新
          /*
          * try 中更新
          * */
          let newData = {
            userId:context.rootState.userInfo.user.userId,
            goodsId:store.goodsInfo[i].goodsId,
            isDecrement:false
          }
          await Api.updateShoppingCartGoodsInfo(newData).then((res)=>{
            if(res.code === 200){
              context.commit(TYPES.ADD_TO_CART_STATE,data)
              has = true
              Message({
                type:"success",
                message:"添加成功！"
              })
            }
          }).catch((err)=>{
            console.log(err)
          })
          return undefined
        }
      }


      /*
      * 触发 try 中插入
      * */
      if(!has){
        Api.addShoppingCartGoodsItem(data).then((res)=>{
          if(res.code === 200){
            context.commit(TYPES.ADD_TO_CART_STATE,data)
            Message({
              type:"success",
              message:"添加成功！"
            })
          }
        }).catch((err)=>{
          console.log(err)
        })

      }
    }catch (e) {
      /*
      * try 中假设不成立，商店信息不存在
      * 触发 catch中 插入
      * */
      //context.rootState.userInfo.user.userId

      Api.addShoppingCartGoodsItem(data).then((res)=>{
        if(res.code === 200){
          context.commit(TYPES.ADD_TO_CART_STATE,data)
          Message({
            type:"success",
            message:"添加成功！"
          })
        }
      }).catch((err)=>{
        console.log(err)
      })

    }

  },
  setAllStoreChecked({commit},data){
    // 设置商店选中状态，在全选按钮下触发，解决v-model带来的不便
    commit(TYPES.SET_STORE_CHECKED,data)
    // 并且选中商店中所有商品
    commit(TYPES.SET_GOODS_CHECKED,data)
  },
  setStoreChecked({commit},data){
    // v-model 已自动设置商店状态，现在只需设定 商品状态
    commit(TYPES.SET_GOODS_CHECKED,data)
  },
  setCartState(context){
    return new Promise((resolve, reject) => {
      let data = {
        userId:context.rootState.userInfo.user.userId
      }
      Api.getShoppingCartGoodsList(data).then((res)=>{
        if (res.code === 200)
        {
          context.commit('stateInit')
          context.commit(TYPES.SET_CART_STATE,res.data)
          resolve(res)
        }
      }).catch((err)=>{
        reject(err)
      })
    })




  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
