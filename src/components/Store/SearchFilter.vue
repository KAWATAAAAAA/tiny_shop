<template>
  <div class="filter-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click="searchBySales">销量从高到低</el-menu-item>
      <el-submenu index="2">
        <template slot="title">价格</template>
        <div :class="{'price-order':true}">
          <el-menu-item index="2-1" @click="filterByPriceAsc">价格从低到高</el-menu-item>
          <el-menu-item index="2-2" @click="filterByPriceDesc">价格从高到低</el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item index="3" class="price-wrapper">
        区间：
        <el-input v-model.number="minPrice" placeholder="起价" size="mini" :class="{'priceInput':true}"/>
        ~
        <el-input v-model.number="maxPrice" placeholder="最高" size="mini" :class="{'priceInput':true}"/>
        <el-button type="danger" @click="filterByPriceRange" size="mini" :class="{'priceCfBtn':true}">确定</el-button>
      </el-menu-item>
      <el-menu-item index="4" @click="filterExt=!filterExt">
        筛选
      </el-menu-item>
      <el-menu-item index="5" class="search-inner">
        <el-input placeholder="请输入内容" v-model="goodsName" @keydown.enter.native="searchByName" class="input-with-search" size="small">
          <el-button slot="append" icon="el-icon-search"  @click="searchByName"></el-button>
        </el-input>
      </el-menu-item>
    </el-menu>
    <div class="filter-ext" :class="{animate:filterExt}" >

      <el-tag
        v-for="item in tags"
        :key="item.label"
        :type="item.type"
        :effect="item.effect"
        @click="filterByTagType(item)">
        <i class="iconfont" :class="item.class" />{{ item.label }}
      </el-tag>
    </div>
  </div>
</template>

<script>
  import Api from '../../api'
  import { mapActions } from 'vuex'

  export default {
    name: 'SearchFilter',
    /*对于本组件，只需知道父组件的分页（一页中）需要多少条数据*/
    props:{
      pageSize:{
        type:Number,
        required:true
      },
      searchText:{
        type:String,
        required: false
      }
    },
    data(){
      return{
        tags:[
          { type: '', label: '眼影',effect:'plain' ,class:'ext-icon-yanying'},
          { type: 'success', label: '眉笔',effect:'plain',class:'ext-icon-meibi'  },
          { type: 'warning', label: '美瞳' ,effect:'plain' ,class:'ext-icon-meitong'},
          { type: 'danger', label: '口红',effect:'plain' ,class:'ext-icon-kouhong'},
          { type: 'info', label: '睫毛' ,effect:'plain' ,class:'ext-icon-jiemao'}
        ],
        lastTag:{
          effect:"dark"  // 模拟单选框
        },

        goodsName:"",
        minPrice:"",
        maxPrice:"",
        goodsLabel:"",
        activeIndex: '1', //查询的条件序号对应
        filterExt:false, // 控制筛选是否显示
      }
    },
    watch:{
      goodsName(val){
        /*本方法用于 标签搜索与 名称搜索 不能同时出现*/
        this.lastTag.effect = "plain" //将上一个点变为浅色
        this.$emit('setGoodsLabel',"")
      },
      goodsLabel(val){
        /*本方法用于 标签搜索与 名称搜索 不能同时出现*/
        this.goodsName = ""
      }
    },
    mounted () {
      if (this.searchText !== undefined)
        this.goodsName = this.searchText
    },
    methods:{
      ...mapActions('commonState',['setGoodsInfo']),

      searchBySales(){

        let data = {
          storeId:this.$route.params.id === undefined ?"":this.$route.params.id,
          sort:"sale",
          minPrice:0,
          maxPrice:0,
          currentPage:1,
          size:this.pageSize,
          goodsName:this.goodsName,
          goodsLabel:this.goodsLabel
        }
        Api.getGoodsList(data).then(res=>{
          console.log(res)
          if (res.code === 200)
          {
            this.$emit('setCurrentPage',1)
            this.$emit('setTotal',res.data.total)
            this.$emit('setSortType',"sale")
            this.setGoodsInfo(res.data.goodsInfo)
          }
        }).catch(err=>{
          console.log(err)

        })
      },
      filterByPriceAsc(){
        let data = {
          storeId:this.$route.params.id === undefined ?"":this.$route.params.id,
          sort:"price-Asc",
          minPrice:0,
          maxPrice:0,
          currentPage:1,
          size:this.pageSize,
          goodsName:this.goodsName,
          goodsLabel:this.goodsLabel
        }
        Api.getGoodsList(data).then(res=>{
          console.log(res)
          if (res.code === 200)
          {
            this.$emit('setCurrentPage',1)
            this.$emit('setTotal',res.data.total)
            this.$emit('setSortType',"price-Asc")
            this.setGoodsInfo(res.data.goodsInfo)
          }
        }).catch(err=>{
          console.log(err)

        })
      },
      filterByPriceDesc(){
        let data = {
          storeId:this.$route.params.id === undefined ?"":this.$route.params.id,
          sort:"price-Desc",
          minPrice:0,
          maxPrice:0,
          currentPage:1,
          size:this.pageSize,
          goodsName:this.goodsName,
          goodsLabel:this.goodsLabel
        }
        Api.getGoodsList(data).then(res=>{
          console.log(res)
          if (res.code === 200)
          {
            this.$emit('setCurrentPage',1)
            this.$emit('setTotal',res.data.total)
            this.$emit('setSortType',"price-Desc")
            this.setGoodsInfo(res.data.goodsInfo)
          }
        }).catch(err=>{
          console.log(err)

        })
      },
      filterByPriceRange(){

        let data = {
          storeId:this.$route.params.id === undefined ?"":this.$route.params.id,
          sort:"none",
          minPrice:this.minPrice === ""?0:this.minPrice,
          maxPrice:this.maxPrice === ""?0:this.maxPrice,
          currentPage:1,
          size:this.pageSize,
          goodsName:this.goodsName,
          goodsLabel:this.goodsLabel
        }
        Api.getGoodsList(data).then(res=>{
          console.log(res)
          if (res.code === 200)
          {
            this.$emit('setCurrentPage',1)
            this.$emit('setTotal',res.data.total)
            this.$emit('setMinPrice',this.minPrice === ""?0:this.minPrice)
            this.$emit('setMaxPrice',this.maxPrice === ""?0:this.maxPrice)
            this.setGoodsInfo(res.data.goodsInfo)
          }
        }).catch(err=>{
          console.log(err)

        })
      },
      searchByName(){
        let data = {
          storeId:this.$route.params.id === undefined ?"":this.$route.params.id,
          sort:"none",
          minPrice:this.minPrice === ""?0:this.minPrice,
          maxPrice:this.maxPrice === ""?0:this.maxPrice,
          currentPage:1,
          size:this.pageSize,
          goodsName:this.goodsName
        }
        Api.getGoodsList(data).then(res=>{
          console.log(res)
          if (res.code === 200)
          {
            this.$emit('setCurrentPage',1)
            this.$emit('setTotal',res.data.total)
            this.$emit('setGoodsName',this.goodsName)
            this.setGoodsInfo(res.data.goodsInfo)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      filterByTagType(tag){

        if (tag.effect === "plain") //代表未点击，即将发送ajax
        {
          tag.effect = "dark"
          this.goodsLabel = tag.label
          this.lastTag.effect = "plain" //将上一个点变为浅色
          this.lastTag = tag            //记录当前点作为历史点
        }
        else
        {
          tag.effect = "plain"
          this.$emit('setGoodsLabel',"")
          this.goodsLabel = ""
          return
        }
        let data = {
          goodsLabel:tag.label,
          currentPage:1,
          size:this.pageSize
        }
        if(tag.effect === "dark"){
          Api.getGoodsList(data).then(res =>{
            console.log(res)
            if (res.code === 200)
            {

              this.$emit('setCurrentPage',1)
              this.$emit('setTotal',res.data.total)
              this.$emit('setGoodsLabel',tag.label)
              this.setGoodsInfo(res.data.goodsInfo)
            }
          }).catch(err =>{
            console.log(err)
          })
        }

      }

    }
  }
</script>

<style scoped lang="scss">
  .animate{
    z-index: 999 !important;
    opacity: 1 !important;
    transform: translate3d(0,0,0) !important;
  }
  .priceInput{
    width: 60px;
  }
  .priceCfBtn{
    margin-left: 1rem;
  }
  .filter-wrapper{
    width: 100%;
    height: auto;
    margin-bottom: .8rem;
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
    position: relative;
    .el-menu-demo{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: none;

      .price-wrapper{
        .el-input{
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 .2rem;
        }
      }
      .search-inner{
        margin-left: auto;
      }
    }
    .filter-ext{
      opacity: 0;
      z-index: -999;
      width: 100%;

      height: 50px;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding-left: 1rem;
      padding-bottom: 2rem;
      box-sizing: content-box;
      transform: translateY(-100px);
      transition: all .5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      position: absolute;
      background: #ffffff;
      box-shadow: 0 5px 12px -15px rgba(0,0,0,.5);
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .9rem;
        padding: .1rem .8rem;
        *background: #fbfcfc;
        border-radius: 5px;
        border:1px solid #e6e6e6;
        margin-right: .8rem;
        &:hover{
          cursor: pointer;
        }

        i{
          font-size: 1.6rem;
          margin-right: .3rem;
        }
      }
    }
    ul > li{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-between;
      .el-input-group{
        width: auto;

      }
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
</style>
<style lang="scss">
  .filter-wrapper > ul > li {
    .input-with-search{
      //输入框
      .el-input__inner{
        min-width: 20rem;
      }
      //按钮
      .el-input-group__append{
        padding: 0 .5rem 0 1rem;
        background: #4fb4fb;
        border: 1px solid #4fb4fb;
        .el-icon-search{
          color: #ffffff;
        }
      }

    }

  }
</style>
