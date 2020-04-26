<template>
  <div class="status-confirm-wrapper">
    <el-steps :space="200" :active="1" finish-status="success" simple >
      <el-step title="确认订单信息"></el-step>
      <el-step title="付款到支付宝"></el-step>
      <el-step title="确认收货"></el-step>
    </el-steps>
  </div>
</template>

<script>
  export default {
    name: 'StatusConfirm'
  }
</script>

<style scoped lang="scss">
.status-confirm-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
}
.el-steps{

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
<style lang="scss">
  .status-confirm-wrapper{

    .el-step__main{
      text-align: center;
    }
    .el-step.is-horizontal .el-step__line{
      height: 5px;

    }
    .el-step__line-inner{
      height: 5px;
    }
  }
</style>
