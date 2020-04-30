<template>
  <div class="buy-now-confirm-wrapper">
    <StatusConfirm />
    <AddressInfo @handleAddressChange="handleAddressChange">
      <template v-slot:header>
        <el-divider content-position="left">确认收货地址</el-divider>
      </template>
    </AddressInfo>
    <OrderInfoConfirm />
    <div class="order-body">
      <span>订单编号：{{orderId}}</span>
      <span>创建时间：{{orderTime}}</span>
      <span>订单状态：待付款</span>
      <span>实付款：{{totalPriceGetter}}￥</span>
      <span><el-input v-model="orderRemarks" placeholder="订单备注" size="small"></el-input></span>
      <span><el-button type="danger" @click="handleSubmit">去付款</el-button></span>

    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapGetters} from 'vuex'

  import StatusConfirm from '../components/BuyNowConfirm/StatusConfirm'
  import AddressInfo from '../components/BuyNowConfirm/AddressInfo-back'
  import OrderInfoConfirm from '../components/BuyNowConfirm/OrderInfoConfirm'
  import Api from '../api'
  export default {
    name: 'BuyNowConfirm',
    data(){
      return {
        orderRemarks:"",
        orderId:"",
        orderTime:"",
        orderStatus:"",
        addressId:""
      }
    },
    components:{
      OrderInfoConfirm,
      AddressInfo,
      StatusConfirm
    },
    computed:{
      ...mapGetters('cartState',['beCheckedArrGetter','totalPriceGetter'])
    },
    created () {

      /*进入后拿 选中的商品id 与 总价格发起请求*/

      let params = {
        orderTotalPrice:this.totalPriceGetter,
        goodsList:[]
      }
      this.beCheckedArrGetter.forEach((item)=>{

        params.goodsList.push(item)
      })

      Api.createOrder(params).then(res=>{
        if (res.code === 200) {
          this.orderId = res.data.orderId
          this.orderTime = res.data.orderTime
          this.orderStatus = res.data.orderStatus
        }
        else
        {
          this.$message({
            type:'error',
            message:res.message
          })
          this.$router.go(-1)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      console.log(to)
      if (to.params && to.params.fromCart)
      {
        next()
      }
      else
        next('/')
    },
    methods:{
      async handleSubmit(){
        let params = {
          orderId:this.orderId,
          orderRemarks: this.orderRemarks,
          addressId:this.addressId?this.addressId:null
        }


        // stage1 发起订单信息更新，
        let res = await Api.updateOrderInfo(params)
        if (res.data === 1 && res.code === 200) {
          /*let params = {
            orderId:this.orderId,
            orderName:"wuyuwei 等三件商品",
            orderRemarks:this.orderRemarks,
            totalPrice:this.totalPriceGetter
          }
          await Api.toAliPayPage(params)*/
          // stage2 将支付宝支付时所需要的数据传到 controller中，
          window.location.href = `http://localhost:8080/tiny_shop/alipay/pay-page?orderId=${this.orderId}&totalPrice=${this.totalPriceGetter}&orderName=wuyuwei等三件商品&orderRemarks=${this.orderRemarks}`
        }
        //
      },
      handleAddressChange(val){
        this.addressId = val
      }
    }
  }
</script>

<style scoped lang="scss">
.buy-now-confirm-wrapper{
  background: #ffffff;
  width: 100%;
  height: calc(100vh - 0px); // -45px footer height
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .address-component-title{
    border-bottom:1px dashed #FF6666;
    width: 100%;
    display: block;
    text-align: left;
    font-weight: bold;
  }
  & > div{
    width: 1280px;
  }
  @media (min-width: 1420px) {
    .buy-now-confirm-wrapper{
      div{
        width: 1496px !important;
      }

    }
  }
  .order-body{
    height: 150px;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    span{
      color: #666666;
      width: 50%;
      padding-left: 2rem;
      .el-input{
        width: 220px;
      }
    }
    & > span:nth-child(2n){
       text-align: right;
    }
    & > span:nth-child(2n -1){
      text-align: left;
    }
  }
}
</style>
