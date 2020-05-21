<template>
  <div class="add-goods-container">
    <el-form :model="goodsInfo" ref="goodsInfo" :class="{form:true}" status-icon class="demo-ruleForm" label-width="100px">
      <img :src="goodsInfo.goodsPreviewImg" style="width: 80px;height: 80px">
      <el-form-item label="宝贝名称 :" prop="goodsName">
        <el-input v-model="goodsInfo.goodsName"  readonly></el-input>
      </el-form-item>

      <el-form-item label="宝贝单价 :" prop="goodsPrice">
        <el-input v-model.number="goodsInfo.goodsPrice" readonly></el-input>
      </el-form-item>
      <el-form-item label="库存数 :" prop="goodsNum">
        <el-input v-model.number="goodsInfo.goodsNum" readonly></el-input>
      </el-form-item>
      <div class="g-label">
        <span v-for="(label,indexOf) in goodsInfo.goodsLabel" :key="indexOf">{{label}} </span>
      </div>
      <el-form-item label="显色度" prop="colorRate">
        <el-rate v-model="goodsInfo.colorRate" :disabled="true"></el-rate>
      </el-form-item>
      <el-form-item label="持久度" prop="holdRate" >
        <el-rate v-model="goodsInfo.holdRate" :disabled="true"></el-rate>
      </el-form-item>
      <el-form-item label="滋润度" prop="waterRate">
        <el-rate v-model="goodsInfo.waterRate" :disabled="true"></el-rate>
      </el-form-item>
      <el-form-item label="顺滑度"  prop="smoothRate">
        <el-rate v-model="goodsInfo.smoothRate" :disabled="true"></el-rate>
      </el-form-item>
      <el-form-item label="产品规格" prop="productSpe">
        <el-input v-model.number="goodsInfo.productSpe" readonly>
          <el-button slot="append">g</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="保质期" prop="ExpTimeNum">
        <el-input v-model.number="goodsInfo.expTimeNum" readonly>
          <el-button slot="append">个月</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="产品介绍:" prop="goodsDesc">
        <div>{{goodsInfo.goodsDesc}}</div>
      </el-form-item>
      <el-form-item label="温馨提示:" prop="goodsTips">
        <div>{{goodsInfo.goodsTips}}</div>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="addToCart(goodsInfo)">加入购物袋</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'GoodsInfoDetail',

    props:{
      goodsInfo:[Object]
    },
    data () {
      return {
      };
    },
    computed:{
      ...mapState('commonState',['token']),
      ...mapState('userInfo',['user']),
      headers(){
        return{
          'Authorization':this.token
        }
      }
    },
    methods:{
      ...mapActions('userInfo',['setUserInfo']),
      ...mapActions('cartState',['addToCartState']),
      addToCart(item){
        this.addToCartState(item)
      },
    },

  }
</script>

<style scoped lang="scss">
  .g-label{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1.5rem;
    border-top: 1px solid #eaeaea;
    height: auto;

    span{
      text-indent: 0;
      padding:.2rem .5rem;
      background: #F56C6C;
      color: #ffffff;
      margin:.5rem .5rem;
      font-size: .6rem;
      border-radius: 10%;
      text-align: center;
    }
  }
  *{
    *border:1px solid red;
  }
  .add-goods-container{
    background: #ffffff;
    width: 100%;

    height: 1500px;
    position: relative;
    border-radius: 0 0 10px 10px;
    .form,.el-form{
      width: 500px;
      height: 100%;
      position:absolute;
      padding: 3rem 2rem;
      top:50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
      .avatar-uploader{
        width: 80px;
        height: 80px;
        border: 1px dashed #cccccc;
        border-radius: 5px;
      }
      .user-intro{
        width: 300px;
      }
    }
  }
</style>
<style lang="scss">
  .add-goods-container{
    .el-upload{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-form-item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-upload{
        img{
          width: 100%;
          height: 100%;
        }
      }
      .el-form-item__content{
        margin-left: 0 !important;
        width: auto;
        textarea{
          width: 300px;
        }
        .el-input__inner:not(textarea){
          width: 250px;
        }
      }
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #FFF;
      background-color: #ff336680;
      border-color: rgba(0,0,0,0);
      outline: none;
      -webkit-box-shadow: -1px 0 0 0 #ff336680;
      box-shadow: -1px 0 0 0 #ff336680;
    }
    .el-button--primary {
      color: #FFF;
      background-color: #ff336680;
      border-color: rgba(0,0,0,0);
      &:hover{
        background-color: #ff3366;
        border-color: rgba(0,0,0,0);
      }
    }
  }
</style>
