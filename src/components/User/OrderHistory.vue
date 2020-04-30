<template>
  <div class="order-history-wrapper">
    <div class="order-area">
      <div class="order-item" v-for="(item,index) in orderHistoryList" :key="index" >
        <span><el-tag  effect="dark" :type="statusStyleFilter(item.orderStatus)" @click="handelOrderComplete(item.orderStatus,index)">{{item.orderStatus | orderStatusFilter}}</el-tag></span>

        <span>
          <span v-for="(goods,key) in item.goodsList" :key="key">
            <img :src="goods.goodsPreviewImg" >
          </span>
        </span>
        <span>共{{item.goodsList.length}}件商品</span>
          <span>订单编号: <i>{{item.orderId}}</i></span>
        <span>￥{{item.orderTotalPrice}}</span>
        <span><i>{{item.orderTime | orderTimeFilterFormat}}</i></span>
        <span>
          <el-popconfirm title="确定删除这条订单吗？" @onConfirm="handelDeleteOrderItem(item.orderId)">
            <el-button slot="reference" type="info" size="mini" plain >删除</el-button>
          </el-popconfirm>
        </span>


      </div>
    </div>
    <el-dialog
      :append-to-body="true"
      :title="dialog.title"
      :visible.sync="dialog.visible"
      :width="dialog.width"
      @close="handelDialogClose"
      center>
      <component :is="dialog.component"
                 :orderHistoryList="orderHistoryList"
                 :index="actionOrderIndex"
                 :status="actionOrderStatus"
                 @setDialog="handelDialogClose"
                 @getList="getList"

      />
    </el-dialog>
  </div>
</template>

<script>
  import Api from '../../api'
  import moment from 'moment'
  import {DialogMixin} from '../../static/utils/mixins'
  import Qs from 'qs'
  import DetailDialog from './OrderHistory/child/DetailDialog'
  export default {
    name: 'OrderHistory',
    data(){
      return {
        orderHistoryList:[], // 历史订单列表

        actionOrderIndex:"", //点击后弹出的订单信息的下标
        actionOrderStatus:""
      }
    },
    mixins:[DialogMixin],
    filters:{
      orderTimeFilterFormat(val){
        return moment(val).format("YYYY-MM-DD HH:mm:ss" )
      },
      orderStatusFilter(val){
        /*由于时间原因 订单状态进行一次缩减，直接付款后就是待取件*/
        switch (val) {
          case 1:return "待确认"; break;
          case 2:return "待确认"; break;
          case 3:return "未支付"; break;
          case 4:return "待取件"; break;//待发货
          case 5:return "待取件"; break;//已发货
          case 6:return "待取件"; break;
          case 7:return "已完成"; break;
          default:return "订单异常"
        }
      }
    },
    created () {
      this.getList()
    },
    methods:{
      async getList(){
        let res = await Api.getOrderHistoryList()
        if(res && res.code === 200){
          this.orderHistoryList = res.data
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      },
      imgViewFilter(goodsId){
        for(const item of this.goodsCollection)
        {
          if (item.goodsId == goodsId)
          {
            return item.goodsPreviewImg
          }
        }
      },
      statusStyleFilter(status){
        switch (status) {
          case 1:return "info"; break;
          case 2:return "info"; break;
          case 3:return "danger"; break;
          case 4:return ""; break;
          case 5:return ""; break;
          case 6:return ""; break;
          case 7:return "success"; break;
          default:return "warning"
        }
      },
      handelDeleteOrderItem(id){
        let params = {
          orderId:id
        }
        let opts = {
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }
        params = Qs.stringify(params)
        Api.deleteOrderItem(params,opts).then(res=>{
          if (res && res.code === 200 && res.data === 1){
            this.$message({
              type:'success',
              message:'删除成功!'
            })
            this.getList()
          }
        })
      },
      handelDialogClose(){
        this.setDialog()
      },
      handelOrderComplete(statusCode,index){
        if (statusCode != 0)
        {

          this.actionOrderIndex = index
          this.actionOrderStatus = statusCode
          this.setDialog(
            true,
            '',
            DetailDialog
          )
        }
      }
    }

  }
</script>

<style scoped lang="scss">
.order-history-wrapper{
  min-height: calc(100vh - 260px);
  background: #f5f6f7;
    img{
      width: 32px;
      height: 32px;
    }
  .order-item{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    background: white;

    > span{
      padding: .5rem;
      text-align: center;
      min-width: 10rem;
      *border-left:1px dashed #333333;
      *border:1px dashed #333333;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        font-weight: normal;
        font-style:normal;
        color: #999999;
        margin-left: .5rem;
      }
    }
    > span:nth-child(1){
      &:hover{
        cursor: pointer;
      }
    }
    > span:nth-child(2){
      width: 200px;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      img{
        margin: 0 .1rem;
        border-radius: 10px;
        background:#f4f4f5 ;
      }
    }
    > span:nth-child(3){
      color:#409eff;
      text-decoration: underline ;
      &:hover{
        cursor: pointer;
      }
    }
    > span:nth-child(4){
      width: 192px;
      color: #67c23a;
    }


    > span:nth-child(5){
      color: #ff4400;
      font-weight: bold;
    }
    > span:nth-child(6){
      flex-grow: 1;
      color: #fab6b6;
    }
    > span:last-child{

    }

  }
}
</style>
