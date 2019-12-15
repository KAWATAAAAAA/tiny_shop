<template>
  <nav>
    <ul>
      <li>
        <font-awesome-icon icon="home" />
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <font-awesome-icon icon="paper-plane" />
        <router-link to="/news">发现</router-link>
      </li>
    </ul>
    <div class="search-container">
      <input id="search" name="search" class="search-input" type="text" placeholder="请输入关键" v-model="searchText">
      <button class="btn btn-outline-success my-2 my-sm-0 search-commit" :class="{isDisabled}" :disabled="isDisabled" type="submit" @click="send">Search</button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Nav',
    data(){
      return{
        searchText:'',
        isDisabled:true
      }
    },
    computed:{

    },
    watch:{
      searchText(newvalue){
        console.log(newvalue)
        newvalue == ""?this.isDisabled = true:this.isDisabled = false;
      }
    },
    methods:{
      send(){
        alert("ajax")
      }
    }
  }
</script>

<style scoped lang="scss">
.isDisabled{
  cursor: not-allowed !important;
  color: #999999 !important;
}
  nav {
    width: 1200px;
    height: 45px;
    display: flex;
    justify-content: space-between;
    & ul{
      display: flex;
      flex-direction:row ;
      flex-wrap: nowrap;
      height: inherit;
      margin-left: 2rem;
      li{
        height: inherit;
        list-style: none;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1.8rem;
        position: relative;
        transition: all .3s linear;

        &:before{
          content: '';
          width: 0;
          height:30%;
          *border-left:1px solid #999999;
          position: absolute;
          right: 0;
        }
        svg{
          color: #999999;
          margin-right: .5rem;
        }
        a{
          font-size:1rem ;
        }

        &::after{
          content: '';
          width: 0;
          height: 0;
          border-bottom: 1px solid red;
          position: absolute;
          left: 100%;
          bottom: 0;

          transition:width 0.5s ease,
          left .3s ease
        ;
        }
        &:hover::after{
          width: 100%;
          left: 0;
          transform: scale(1.1);
        }
      }
    }

    a {
      text-decoration: none;
      color: #2c3e50;


    &.router-link-exact-active {
       color: #42b983;
     }
    }

    .search-container{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      position: relative;

      .search-commit{
        position:absolute;
        right: 0;
        top:50%;
        transform:translateY(-50%);
        outline: none;
        border: 1px solid #ced4da;
        border-top:none;
        border-bottom:none;
        border-right:none;

        &:focus{
          outline:0;
          box-shadow: none !important;
        }
      }
    }
    .search-input{
      width: 360px;
      height: 35.75px;
      outline: none;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      caret-color: red;
      text-indent: 1rem;
    }
  }
</style>
