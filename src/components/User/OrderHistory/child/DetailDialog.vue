<template>
    <div class="order-item-info-wrapper">
      <h2 class="title">订单详情</h2>
      <div class="body">
        <div class="goods-item-view" >

          <div class="goods-info" v-for="(goods,i) in orderHistoryList[index].goodsList" :key="i">
            <img :src="goods.goodsPreviewImg">
            <span>{{goods.goodsName}}</span>
            <span style="color: #ff4400">￥{{goods.goodsPrice}}</span>
            <span>x{{goods.num}}</span>
          </div>
          <div class="order-info">
            <span>订单编号：{{orderHistoryList[index].orderId}}</span>
            <span>创建时间：{{orderHistoryList[index].orderTime | orderTimeFilter}}</span>
            <span>实付金额：<i>￥{{orderHistoryList[index].orderTotalPrice}}</i></span>
          </div>
          <div class="confirm-area" v-if="status == 4 || status == 5 || status == 6">
            <el-button type="danger" size="small" @click="handelOrderConfirm(orderHistoryList[index].orderId)">确认收货</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import Api from '../../../../api'
  export default {
    name: 'DetailDialog',
    props:{
      orderHistoryList:[Array],
      index:[Number,String],
      status:[Number,String]
    },
    filters:{
      orderTimeFilter(val){
        return moment(val).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    computed:{
    },
    methods:{
      async handelOrderConfirm(orderId){
        let params = {
          orderId
        }
        let res = await Api.updateOrderStatusCompleted(params)
        if(res && res.code === 200 && res.data === 1){
          this.$message({
            type:"success",
            message:"确认收货已完成！"
          })
          this.$emit('setDialog') //as handelDialogClose in parent component
          this.$emit('getList')
        }
      }

    }
  }
</script>

<style scoped lang="scss">
.order-item-info-wrapper{
  h2{
    margin-bottom: 1rem;
  }
  .body{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .goods-item-view{

      width: 100% ;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      > div{
        margin-bottom: .5rem;
        min-height: 64px;
        display: flex;
        align-items: center;
      }
      .goods-info{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        span{
          padding: 0 .5rem ;
        }

      }
      .order-info{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        span{
          width: 50%;
        }
        > :last-child{
          i{
            font-style: normal;
            color: #ff4400;
            font-weight: bold;
          }
        }
      }
      .confirm-area{
        width: 100%;
        margin-top: 3rem;
      }
    }
    img{
      width: 64px;
      height: 64px;
    }
  }
}
</style>
