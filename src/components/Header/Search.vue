<template>

  <div class="search-container" @keypress.13="$router.push({name:'GoodsCascade',query:{goodsName:searchText}})">
    <input id="search" name="search" class="search-input" type="text" placeholder="请输入关键" v-model="searchText" pattern="[A-z]{3}">
    <button class="btn btn-outline-success my-2 my-sm-0 search-commit"
            :class="{isDisabled}" :disabled="isDisabled"
            type="submit"
            @click="$router.push({name:'GoodsCascade',query:{goodsName:searchText}})">
      Search
    </button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Search',
    data(){
      return{
        searchText:'',
        isDisabled:true
      }
    },
    computed:{

    },
    watch:{
      searchText(newval){
        newval == ""?this.isDisabled = true:this.isDisabled = false;
      },
      '$route'(to,from){
        if (to.name !== "GoodsCascade")
        {
          this.searchText = ""
          this.setGoodsInfo([])
        }
          this.searchText = to.query.goodsName
      }

    },
    methods:{
      ...mapActions('commonState',['setGoodsInfo']),
      // 判断路由变化
     /* if(false){

      }*/
    }
  }
</script>

<style scoped lang="scss">
.isDisabled{
  cursor: not-allowed !important;
  color: #999999 !important;
}
.search-container{
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-right: 20px;

  position: relative;
  .search-input{
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    *border:1px solid red;
    border-bottom: 1px solid #ced4da;
    font-size: 1.05rem;
    caret-color: #333333;
    text-indent: 1rem;
    background: #FFffff;
    &::-webkit-input-placeholder{
      color: #999999;
    }
  }
  .search-commit{
    position:absolute;
    right: 0;
    top:50%;
    transform:translateY(-50%);
    outline: none;
    border: none;
    border-radius:3px ;
    padding: .5rem;

    &:active{
      outline:0;
    }
  }
}


</style>
