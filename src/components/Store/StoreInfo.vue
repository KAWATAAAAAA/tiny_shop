<template>
    <div class="store-info-container">
      <div class="base-top">
        <div class="store-logo">
          <img :src="store.storeLogo" />
        </div>
        <div class="store-name">
          <h1>{{store.storeName}}</h1>
          <span>{{store.storeDesc}}</span>
        </div>
        <ul class="store-ex-info">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-Personal" id="ext-icon-Personal"></use>
            </svg>
            店长：{{store.ownerRealName}}</li>
          <li>

            <i class="iconfont ext-icon-completed" id="ext-icon-completed"/>
            总销售量：65</li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-shijian"></use>
            </svg>
            开店时间：{{$moment(store.openTime).format("YYYY-DD-MM")}}</li>
        </ul>
      </div>
      <div class="base-bottom">
        <ul class="store-actions">
          <li><router-link :to="{name:'MyGoodsList'}"><i class="iconfont ext-icon-baobei" id="ext-icon-baobei"/>我的宝贝</router-link> </li>
          <li><router-link :to="{name:'AddGoods'}"><i class="iconfont ext-icon-shangjia1" id="ext-icon-shangjia1"/>发布宝贝</router-link></li>
          <li><i class="iconfont ext-icon-order" id="ext-icon-order"/>订单中心</li>
          <li><router-link :to="{name:'DataCenterChartView'}"><i class="iconfont ext-icon-tubiao" id="ext-icon-tubiao" />数据中心</router-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
  import Api from '../../api'
  export default {
    name: 'StoreInfo',
    data(){
      return{
        store:{
          storeName:"",
          storeDesc:"",
          storeLogo:"",
          storeId:"",
          ownerRealName:"",
          userId:"",
          openTime:""
        }
      }
    },
    mounted () {
      let data ={
        id:this.$route.params.storeId
      }
      Api.getStoreInfo(data).then( res=>{
        console.log(res)
        if (res.code === 200)
        {
          this.store = res.data
          sessionStorage.setItem("store_name",res.data.storeName)
        }
        else
          alert("查询错误")
      }).catch( err =>{
        console.log(err)
      })
    }
  }
</script>

<style scoped lang="scss">
  *{
    *border:1px solid red;
  }
  #ext-icon-Personal{
    fill: #409EFF;
  }
  #ext-icon-completed{
    color: red;
    font-size: 1.2rem;
    margin-right: .8rem;
  }
  #ext-icon-tubiao{
    color:#ff4400;
    font-size: 1.5rem;
    margin-right: .8rem;
  }
  #ext-icon-baobei{
    color: red;
  }
  #ext-icon-shangjia1{
    color: #409EFF;
  }
  #ext-icon-order {
    color: rgb(0, 192, 145)
  }
.store-info-container{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  .base-top{
    border-bottom: 1px solid #e9ecef;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .store-logo{
      width: 80px;
      height: 80px;

      border-radius: 50%;
      border: 1px solid #e9ecef;
      img{
        border-radius: 50%;
        width: inherit;
        height: inherit;
      }
    }
    .store-name{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: flex-start;
      margin-left: 2rem;
      span{
        color: #666666;
      }
    }
    .store-ex-info{
      flex-grow: 1;

      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: flex-end;
      height: 80px;
      li{
        padding: .5rem 2rem;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999999;
        svg{
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 1rem;
        }
      }
    }
  }
  .base-bottom{

    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .store-actions{
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      li{
        padding: .5rem 2rem;
        list-style: none;
        i{
          font-size: 1.3rem;
          margin-right: .5rem;
        }
      }
    }
  }
}
</style>
