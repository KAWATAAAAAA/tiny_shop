<template>
  <div class="goods-list-container">
    <div class="g-header">
      <SearchFilter
        :pageSize="pageSize"
        @setCurrentPrice="setCurrentPage"
        @setTotal="setTotal"
        @setSortType="setSortType"
        @setMinPrice="setMinPrice"
        @setMaxPrice="setMaxPrice"
        @setGoodsName="setGoodsName"
        @setGoodsLabel="setGoodsLabel"
        />
    </div>
    <div class="g-body">

      <div class="g-box" v-for="(item,index) in goodsInfo" :key="index">
        <div class="g-preview">
          <img :src="item.goodsPreviewImg" />
        </div>
        <div class="g-price">
          {{item.goodsPrice}}<span>销量：{{item.goodsSalesVol}}</span>
        </div>
        <div class="g-title">
          {{item.goodsName}}
        </div>
        <div class="g-label">
          <span v-for="(label,index) in item.goodsLabel" :key="index">{{label}} </span>
        </div>
      </div>
    </div>
    <div class="g-footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Api from '../../api'
  import SearchFilter from './SearchFilter'
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'MyGoodsList',
    components:{
      SearchFilter
    },
    data(){
      return{
        total:0,//总条数，后端赋值
        pageSize:12, //每页的最大条数
        currentPage:1, //默认打开页
        /*
        * 由于子组件做了查询后，本组件在做分页时对于以下状态是未知的
        * 所以必须由子组件传值修改以下值，让本组件维护该值进行分页查询
        * */
        sort:"none",      //排序方式 ，由子组件赋值，本组件维护状态做分页
        minPrice:0,  //由子组件赋值，本组件维护状态做分页
        maxPrice:0,  //由子组件赋值，本组件维护状态做分页
        goodsName:"",//由子组件赋值，本组件维护状态做分页
        goodsLabel:"",//由子组件赋值，本组件维护状态做分页
      }
    },
    watch:{
      minPrice(newval){
        this.$emit('setMinPrice',newval)
      },
      maxPrice(newval){
        this.$emit('setMaxPrice',newval)
      },
      goodsName(newval){
        this.$emit('setGoodsName',newval);
      }
    },
    computed:{
      ...mapState('commonState',['goodsInfo'])
    },
    mounted () {
      let data = {
        storeId:this.$route.params.id,
        sort:"none",
        minPrice:0,
        maxPrice:0,
        currentPage:1,
        size:this.pageSize
      }
      Api.getMyGoodsList(data).then(res=>{
        if (res.code === 200)
        {
          console.log(res)
          this.total = res.data.total
          this.setGoodsInfo(res.data.goodsInfo)
        }
      }).catch(err=>{

      })
    },
    methods:{
      ...mapActions('commonState',['setGoodsInfo']),
      handleCurrentChange(val){
        /*
        * 载入页面是普通分页查询
        * 点击分页按钮是判断是否开启了查询条件
        * 0: 按照名称查询
        * 1：销量排序
        * 2-1：价格升序
        * 2-2：价格降序
        * 3：价格区间
        * 4：按标签类型分类查询
        * */
        console.log(val)

        let data = {
             storeId:this.$route.params.id,
             sort:this.sort,
             minPrice:this.minPrice,
             maxPrice:this.maxPrice,
             currentPage:val,
             size:this.pageSize,
             goodsName:this.goodsName,
             goodsLabel:this.goodsLabel
        }


        Api.getMyGoodsList(data).then(res=>{
          console.log(res)
          if (res.code === 200)
          {
            this.total = res.data.total
            this.setGoodsInfo(res.data.goodsInfo)
          }
        }).catch(err=>{
          console.log(err)

        })
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

  *{
    *border:1px solid red;
  }
.goods-list-container{
  width: 100%;
  .g-header{
    width: 100%;
    height: auto;
    padding:0 .5rem;
  }
  .g-body{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    .g-box{
      width: 250px;
      height: 330px;
      margin-bottom: 3rem;
      margin-right: .2rem;
      *border: 1px solid rgb(134, 142, 150);
      box-shadow: 0px 0px 10px -8px rgba(0,0,0,.8);
      border-radius: 5px;
      position: relative;
      .g-preview{
        width: 100%;
        border-bottom: 1px solid #eaeaea;
        background: #fbfcfc;
        img{
          width: 150px;
          height: 150px;
        }
      }
      .g-price{
        font-weight: bold;
        color: #F40;
        position: relative;
        text-align: left;
        padding: .5rem 1rem .5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span{
          margin-left: auto;
          font:.8rem normal;
          color: #999999;
        }
        &::before{
          content: '\00A5';

          color: #F40;
        }
      }
      .g-title{
        text-align: left;
        padding:.2rem 1rem;
       *border:1px solid red;

      }
      .g-label{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        align-content: flex-end;
        padding: .2rem;
        position: absolute;
        bottom: 0;
        span{
          padding:.1rem .4rem;
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
}
</style>
<style lang="scss">
  .goods-list-container{
    .filter-wrapper{
      ul > li{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
      }
      .el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: none !important;
        color: #333333;
        font-weight: bold;
      }
      .el-menu--horizontal>.el-menu-item {
        border-bottom: none !important;
      }

    }
  }
  .price-order{

    padding: 0 .5rem;
    .el-menu-item{
    }
  }
  .el-menu--popup{
    min-width: auto !important;
  }
</style>
