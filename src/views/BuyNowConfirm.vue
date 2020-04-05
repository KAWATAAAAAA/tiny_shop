<template>
  <div class="buy-now-confirm-wrapper">
    <StatusConfirm />
    <AddressEdit>
      <template v-slot:header>
        <el-divider content-position="left">确认收货地址</el-divider>

      </template>
    </AddressEdit>
    <OrderInfoConfirm />
  </div>
</template>

<script>
  import StatusConfirm from '../components/BuyNowConfirm/StatusConfirm'
  import AddressEdit from '../components/BuyNowConfirm/AddressInfo'
  import OrderInfoConfirm from '../components/BuyNowConfirm/OrderInfoConfirm'
  export default {
    name: 'BuyNowConfirm',
    data(){
      return {}
    },
    components:{
      OrderInfoConfirm,
      AddressEdit,
      StatusConfirm
    }
  }
</script>

<style scoped lang="scss">
.buy-now-confirm-wrapper{
  background: #ffffff;
  width: 100%;
  height: calc(100vh - 45px);
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
}
</style>
