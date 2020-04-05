<template>
  <div class="goods-cascade-container" >
    <div class="g-header">
      <SearchFilter
        :pageSize="size"
        :searchText="$route.query.goodsName"
        @setCurrentPrice="setCurrentPage"
        @setTotal="setTotal"
        @setSortType="setSortType"
        @setMinPrice="setMinPrice"
        @setMaxPrice="setMaxPrice"
        @setGoodsName="setGoodsName"
        @setGoodsLabel="setGoodsLabel"
      />
    </div>
    <div class="goods-area"  v-infinite-scroll="load"
         :infinite-scroll-disabled="disabled"
         :infinite-scroll-distance="0">

      <div class="g-body">
        <div class="goods" v-for="(item,index) in goodsInfo" :key="index">
          <div class="img">
            <img :src="item.goodsPreviewImg" />
          </div>
          <div class="g-price">
              {{item.goodsPrice}}
          </div>
          <div class="g-name">
            {{item.goodsName}}
          </div>
          <div class="g-sale">销量：{{item.goodsSalesVol}}</div>
          <div class="g-label">
            <span v-for="(label,index) in item.goodsLabel" :key="index">{{label}} </span>
          </div>
          <div class="store-info">
            店铺：{{item.storeName}}
            <span class="add-to-cart" @click="addToCart(item)">
              <i class="iconfont ext-icon-iconset0316" />
              <span class="animate-assis"></span>
              <span class="animate-assis"></span>
              <span class="animate-assis"></span>

            </span>
          </div>

        </div>

      </div>
      <div class="g-footer">

      </div>
    </div>
    <div class="load-tips">
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import Api from '../api'
  import SearchFilter from '../components/Store/SearchFilter'

  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'GoodsCascade',
    data(){
      return{
        total:0, // 页面条数上限
        count:0,// 计数，默认给出0条
        loading: false,

        /*分页*/
        currentPage:1, //默认开启页
        size:8, //一页滚动之后的加载条数

        sort:"none",      //排序方式 ，由子组件赋值，本组件维护状态做分页
        minPrice:0,  //由子组件赋值，本组件维护状态做分页
        maxPrice:0,  //由子组件赋值，本组件维护状态做分页
        goodsName:"",//由子组件赋值，本组件维护状态做分页
        goodsLabel:"",//由子组件赋值，本组件维护状态做分页
      }
    },
    components:{
      SearchFilter
    },
    watch:{
      /*
      * 一旦监测到路由的变化那么就是搜索词换了一个
      * 立马初始化分页
      * */
      '$route'(val){
        this.currentPage = 1
        let data = {
          currentPage:this.currentPage,
          size:this.size,
          goodsName:this.$route.query.goodsName
        }
        Api.getGoodsList(data).then(res =>{
          console.log(res)
          if (res.code === 200)
          {
            this.total = res.data.total
            this.count = res.data.total > 8 ?8:res.data.total
            this.setGoodsInfo(res.data.goodsInfo)
          }

        }).catch(err=>{
          console.log(err)
        })
      }
    },
    computed: {
      ...mapState('commonState',['goodsInfo']),
      noMore () {
        /*是否没有更多取决于页面总条数最大上限*/
        return this.count >= this.total
      },
      disabled () {
        /*是否禁用 取决于 loading 的值*/
        return this.loading || this.noMore // 有一个为 true 滚动将被禁止
      }
    },
    created () {
      let data = {
        currentPage:1,
        size:8,
        goodsName:this.$route.query.goodsName
      }
      Api.getGoodsList(data).then(res =>{
        console.log(res)
        if (res.code === 200)
        {
          this.total = res.data.total
          this.count = res.data.total > 8 ?8:res.data.total
          this.setGoodsInfo(res.data.goodsInfo)
        }

      }).catch(err=>{
        console.log(err)
      })

    },
    methods:{
      ...mapActions('commonState',['setGoodsInfo','pushGoodsInfo']),
      ...mapActions('cartState',['addToCartState']),
      load(){
        console.log("执行了滚动")
        //滑到底部时进行加载
        this.loading = true
        this.currentPage ++
        console.log(this.currentPage)
        let data = {
          currentPage:this.currentPage,
          size:this.size,
          goodsName:this.$route.query.goodsName
        }
        Api.getGoodsList(data).then(res =>{
          console.log(res)
          if (res.code === 200)
          {
            this.count += this.size
            this.pushGoodsInfo(res.data.goodsInfo)
            this.loading = false
          }

        }).catch(err=>{
          console.log(err)
        })
      },
      addToCart(item){
        this.addToCartState(item)
      },
      setCurrentPage(val){
        this.currentPage = val
      },
      setTotal(val){
        this.total = val
      },
      setMinPrice(val){
        this.minPrice = val
      },
      setMaxPrice(val){
        this.maxPrice = val
      },
      setSortType(val){
        this.sort = val
      },
      setGoodsLabel(val){
        this.goodsLabel = val
      },
      setGoodsName(val){
        this.goodsName = val
      }
    }
  }
</script>

<style scoped lang="scss">
.goods-cascade-container{
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 45px - 20px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .g-header{
    width: 1280px;
    height: auto;
  }
  .goods-area{
    width: 1280px;
    height: calc(100% - 60px - 20px - 10px);
    overflow-y: auto;
    .g-body{
      *{
        *border:1px solid red;
      }
      background: #FFffff;
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: flex-start;
      .goods{
        width: 280px;
        min-height: 370px;
        margin:2rem;
        box-shadow: 0px 0px 10px -8px rgba(0,0,0,.8);
        position: relative;
        .img{
          width:100%;
          height: 185px;
          background: #fbfcfc;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          img{
            width: 128px;
            height: 128px;
            transition: all .5s ease;
          }
          &:hover img{
            transform: scale(1.5);
          }
        }
        .g-price{
          font-weight: bold;
          color: #F40;
          position: relative;
          width: 100%;
          text-align: left;
          text-indent: 2rem;
          padding: .5rem 0;
          &::before{
            content: '\00A5';
            color: #F40;
          }
        }
        .g-name{
          text-align: left;
          text-indent: 2rem;
          padding: .5rem 0;
        }
        .g-sale{
          width: 100%;
          height: auto;
          text-align: left;
          text-indent: 2rem;
          padding: 1rem 0;
          color:#999999;
        }
        .store-info{
          width:100%;
          height: auto;
          *border-top: 1px solid #eaeaea;
          *border-bottom: 1px solid #eaeaea;
          text-indent: 2rem;
          letter-spacing: .1rem;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .add-to-cart{
            display: inline-block;
            width: 50px;
            height: 50px;
            position: relative;
            transform: translateY(-5%);
            margin-right: 1rem;
            text-align: right;
            &:hover{
              cursor: pointer;
            }
            &:hover .animate-assis{
              animation:bance .7s .2s ease-out 1 forwards;
            }
            &:hover :nth-child(1){
              animation-delay: .1s;
            }
            &:hover :nth-child(2){
              animation-delay: .5s;
            }
            &:hover :nth-child(3){
              animation-delay: .9s;
            }

            .animate-assis{
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: rgba(255,153,153,.2);
              position:absolute;
              left:0;
              top:0;
              z-index: -1;
              border:1px solid rgba(255,153,153,.5);
              box-sizing: border-box;
              opacity: 0;
            }
            @keyframes bance {
              from{
                transform: scale(1);
                opacity: 0;
              }
              2%{

                opacity: .5;
              }
              50%{
                opacity: .8;
              }
              to{
                transform: scale(2);
                opacity: 0;
              }
            }

            &::before{

              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0;
              margin: 0;
              height: auto;
              font-size: 1rem;
              content: "+";
             /* position: absolute;
              right: -5%;
              top: -5%;*/
              color: #666666;
            }
            i{
              width: 1rem;
              height: 1rem;
              text-align: center;
              padding: 0;
              position:absolute;
              left:50%;
              top:50%;
              font-size: 1.3rem;
              transform:translateX(-50%) translateY(-50%);
              &::before{
                position:absolute;
                left:50%;
                top:50%;
                transform:translateX(-80%) translateY(-50%);
              }
            }
          }
        }
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
      }

    }
    &::-webkit-scrollbar{
      background: #ffffff;
      width: 10px;
      -webkit-border-radius:6px;
    }
    &::-webkit-scrollbar-thumb{
      background: #eaeaea;
      border-radius: 15px;

    }
  }
  @media (min-width: 1420px) {
    .goods-area,.g-header{
      width: 1496px !important;
    }
  }
  .load-tips{
    width: 100%;
    height: auto;
    order: 999;
    position: absolute;
    bottom: 0;
    p{
      color: #999999;
    }
  }
}
</style>
