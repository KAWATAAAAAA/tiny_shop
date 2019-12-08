<template>
  <div id="app">
    <div class="reference"></div>
    <header>
      <div class="logo-user-status">
        <img src="./assets/logo.png" @click="toHome">
        <UserInfo />
      </div>
      <Nav />
    </header>
    <div class="main-body">
      <router-view></router-view>
    </div>
    <footer>

    </footer>
  </div>
</template>
<script>

 // import Login from './components/Login'
 import $ from 'jquery'
 import Nav from './components/Nav'
 import UserInfo from './components/UserInfo'

  export default {
    name:'App',
    components:{
      Nav,
      UserInfo
    },
    methods:{
      toHome(){
        this.$router.push('/')
      }
    },
    mounted () {
      let nav = document.querySelector('header');
      let reference = document.querySelector(".reference");

      new IntersectionObserver(entries => {   // 页面载入 自动调用 callback
        console.log(entries)                            //他返回一个被监听的实例

        let refOb = entries[0];                        //取出 IntersectionObserverEntry
        let top = refOb.boundingClientRect.top;         //取出数值，被监听的元素距离 视口 viewport 的距离
        console.log(top)

        // 当参照元素的的top值小于0，也就是在视窗的顶部的时候，开始吸顶，否则移除吸顶
        if (top < 0) nav.classList.add("fixed");
        else nav.classList.remove("fixed");

      }).observe(reference); //对参考元素进行监听
    }
  }


</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    *border: 1px solid red;
  }

  html,body{
    width: 100%;
    height: 100%;
    background: #f5f6f7 !important;
  }
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height:auto;
  background: #f5f6f7;
  display: flex;
  flex-direction:column ;
  flex-wrap: wrap;
  header{
    width: 100%;
    height: 90px;
    background: white;
    padding: 0 !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    *position: sticky;
    top:0;
    z-index: 999;
    box-shadow: 0px 2px 10px -8px rgba(0,0,0,.3);
  }
  .main-body{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  footer{
    width: 100%;
    *height:100px;
    background: #0b2e13;
  }

}
.logo-user-status{
  width:1200px;
  height: 45px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  img{
    display: block;
    transform: scale(0.45) translateX(-50%);

    &:hover{
      cursor: pointer;
    }
  }
}


</style>
