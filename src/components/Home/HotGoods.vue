<template>
    <div class="hot-list">
      <div class="hot-title">热销产品</div>
      <div class="hot-item" v-for="goods in hotItems" :key="goods.id" v-show="goods.goodsSalesVol > 0">
        <img :src="goods.goodsPreviewImg">
        <div class="hot-name" :title="goods.goodsName">
          {{goods.goodsName}}
        </div>
        <div class="hot-sales">
          销量：{{goods.goodsSalesVol}}
        </div>
      </div>
    </div>
</template>

<script>
  import Api from '../../api'
  export default {
    name: 'HotGoods',
    data(){
      return{
        hotItems:[
          /*
          {
            goodsID:'2',
            goodsImg:require('../../assets/images/goodsPic/loreal.png'),
            goodsName:'欧莱雅小蜜罐金致臻颜花蜜奢养女保湿滋润抗皱面霜50ml',
            goodsSales:'514'
          },
          {
            goodsID:'2',
            goodsImg:require('../../assets/images/goodsPic/loreal.png'),
            goodsName:'欧莱雅小蜜罐金致臻颜花蜜奢养女保湿滋润抗皱面霜50ml',
            goodsSales:'514'
          },
          {
            goodsID:'2',
            goodsImg:require('../../assets/images/goodsPic/loreal.png'),
            goodsName:'欧莱雅小蜜罐金致臻颜花蜜奢养女保湿滋润抗皱面霜50ml',
            goodsSales:'514'
          },
          */
        ]
      }
    },
    async created () {
      let res =  await Api.getHopGoodsList()
      if(res && res.code === 200)
      {
        this.hotItems = res.goodsInfo
      }
    }
  }
</script>

<style scoped lang="scss">
.hot-list{
  width: 100%;
  height:500px;
  background: white;

  .hot-title{
    width:100%;
    height: 45px;
    line-height: 45px;
    text-align: left;
    text-indent: 2rem;
    border-bottom: 1px solid #eaeaea;
    position: relative;

    &::before{
      content: '';
      width: 8px;
      height: 40%;
      background: #f85959;
      position: absolute;
      top:50%;
      left: 0;
      transform: translateY(-50%);

    }
  }
  .hot-item{
    *{
      *border:1px solid red;
    }
    width: 100%;
    height: 70px;

    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;

    img{
      width: 48px;
      height: 48px;


    }

    .hot-name{

      width: 9rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      text-align: left;

    }
    .hot-sales{
      width: 5rem;
      color: #999999;
      text-align: left;
    }

  }
}
</style>
