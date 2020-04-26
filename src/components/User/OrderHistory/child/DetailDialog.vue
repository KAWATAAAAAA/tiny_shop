<template>
    <div class="order-item-info-wrapper">
      <h2 class="title">订单详情</h2>
      <div class="body">
        <div class="goods-item-view" v-for="(goodsId,key) in orderHistoryList[index].goodsIdList" :key="key">
            <img :src="imgViewFilter(goodsId)" >
          <span>{{goodsNameFilter(goodsId)}}</span>
          <span>{{goodsPriceFilter(goodsId)}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'DetailDialog',
    props:{
      orderHistoryList:[Array],
      goodsCollection:[Array],
      index:[Number,String]
    },
    mounted () {
      // 首先在订单列表中是哪个订单被点击了

      console.log(this.orderHistoryList[this.index])
    },
    computed:{
      titleViewFilter(){
        for (const item in this.goodsCollection)
        {
          if (this.orderHistoryList[this.index].goodsIdList[0] == item.goodsId)
            return item.goodsName
        }
        return ""
      }
    },
    methods:{
      imgViewFilter(goodsId){
        for(const item of this.goodsCollection)
        {
          if (item.goodsId == goodsId)
          {
            return item.goodsPreviewImg
          }
        }
      },
      goodsNameFilter(goodsId){
        for(const item of this.goodsCollection)
        {
          if (item.goodsId == goodsId)
          {
            return item.goodsName
          }
        }
      },
      goodsPriceFilter(goodsId){
        for(const item of this.goodsCollection)
        {
          if (item.goodsId == goodsId)
          {
            return item.goodsPrice
          }
        }
      }

    }
  }
</script>

<style scoped lang="scss">
.order-item-info-wrapper{
  .body{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border:1px solid blue;
    flex-direction: column;
    .goods-item-view{
      width: 100%;
      border:1px solid red;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    img{
      width: 64px;
      height: 64px;
    }
  }
}
</style>
