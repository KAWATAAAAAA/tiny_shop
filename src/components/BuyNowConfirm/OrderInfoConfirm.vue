<template>
  <div class="orderInfo-confirm-wrapper">
    <el-divider content-position="left">确认订单信息</el-divider>
    <div class="goods-wrapper" >
      <div class="goods-item" v-for="(item,index) in beCheckedArrGetter" :key="index">
        <div class="g-pre-view"><img :src="item.goodsPreviewImg" ></div>
        <div class="g-name">商品名称：<span style="color: #666666">{{item.goodsName}}</span></div>
        <div class="g-price">单价：<span style="color: #FF4400;font-weight: bold">{{item.goodsPrice}}￥</span></div>
        <div class="g-num">{{item.num}}</div>
        <div class="g-price">总价：<span style="color: #FF4400;font-weight: bold">{{item.num * item.goodsPrice}}￥</span></div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'OrderInfoConfirm',
    computed:{
      ...mapGetters('cartState',['beCheckedArrGetter'])
    }
  }
</script>

<style scoped lang="scss">
.orderInfo-confirm-wrapper{
  height: auto;
  width: 100%;

  .goods-wrapper{
    width: 100%;
    height: 250px;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    .goods-item{
      width: 100%;
      height: 64px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      & > div{
        width: 20%;
        text-align: left;
      }
      .g-pre-view{
        height: 100%;
        width: 64px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .g-num{
        position: relative;
        &::before{
          content: '\2716';
          position:absolute;
          left:0;
          top:50%;
          transform:translateX(-110%) translateY(-50%);
          font-size: .8rem;
        }
      }
    }
  }


  .orderInfo-title{
    border-bottom:1px dashed #FF6666;
    width: 100%;
    display: block;
    text-align: left;
    font-weight: bold;
  }
}
</style>
