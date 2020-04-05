<template>
  <div class="orderInfo-confirm-wrapper">
    <el-divider content-position="left">确认订单信息</el-divider>

  </div>
</template>

<script>
  export default {
    name: 'OrderInfoConfirm'
  }
</script>

<style scoped lang="scss">
.orderInfo-confirm-wrapper{
  height: 40%;
  .orderInfo-title{
    border-bottom:1px dashed #FF6666;
    width: 100%;
    display: block;
    text-align: left;
    font-weight: bold;
  }
}
</style>
