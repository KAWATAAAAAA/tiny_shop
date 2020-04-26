import * as TYPES from './mutation-types'
import LS from '../../static/js/LogStyle'

const mutations = {
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
        console.log("%c 本地无数据",LS.lightRed)
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
          console.log("%c 商店相同，并且goodsInfo中不存在即将push的数据",LS.lightRed)
          goods.checked = false
          store.goodsInfo.push({
            ...goods
          })
        }else if(goods.storeId !== store.storeId){
          // 商店不同,直接push
          console.log("%c 商店不同，直接push",LS.lightRed)
          goods.checked = false
          item = {
            storeId:goods.storeId,
            storeName:goods.storeName,
            checked:false,
            goodsInfo:[{...goods}]
          }
          storeArr.push(item)
        }
      }
    }

  }
}
