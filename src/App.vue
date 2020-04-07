<template>
  <div id="app">
    <div class="reference"></div>
    <header v-show="$route.name !== 'Login'&& $route.name !== 'Register'">
      <keep-alive>
        <Header />
      </keep-alive>
    </header>
    <div class="main-body">
      <keep-alive :exclude="['User','Login','Register','Store','GoodsCascade']">
        <router-view></router-view>
      </keep-alive>
    </div>
    <footer>

    </footer>
    <transition name="bounce"
                enter-class="bounce-in-enter"
                enter-active-class="bounce-in-active"
                leave-class="bounce-out-enter"
                leave-active-class="bounce-out-active">
      <ShoppingCart v-show="isCartOpen"/>
    </transition>
  </div>
</template>
<script>
 import Header from './views/Header'
 import {mapState} from 'vuex'
  export default {
    name:'App',
    components:{
      Header,
      ShoppingCart:()=> import('./components/ShoppingCart') // 没配合 v-if使用 这条懒加载是无效的，但是用了v-if又会有其它问题
    },
    computed:{
      ...mapState('commonState',['isCartOpen'])
    },

    mounted () {
      let nav = document.querySelector('header');
      let reference = document.querySelector(".reference");
      reference.style.top = nav.offsetTop + "px";

      new IntersectionObserver(entries => {   // 页面载入 自动调用 callback
        //console.log(entries)                            //他返回一个被监听的实例

        let refOb = entries[0];                        //取出 IntersectionObserverEntry
        let top = refOb.boundingClientRect.top;         //取出数值，被监听的元素距离 视口 viewport 的距离
        //console.log(top)

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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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

  html,body{
    width: 100%;
    height: 100%;
    background: #f5f6f7 !important;
  }
  .reference{
    position: absolute;
  }
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset; // 清除chrom浏览器的表单记忆自动填充的蓝色背景
  }
  a:-webkit-any-link {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height:auto;
  background: #f5f6f7;
  display: flex;
  flex-direction:column ;
  flex-wrap: wrap;

  .bounce-in-active,.bounce-out-active{
    transform: translateY(50%);

  }
  .bounce-in-enter,.bounce-out-enter{
    transform: translate3d(100%,50%,0);
    opacity: 0;
  }
  header{
    width: 100%;
    height: 45px;
    background: white;
    padding: 0 !important;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    *position: sticky;
    top:0;
    z-index: 999;
    box-shadow: 0 2px 10px -8px rgba(0,0,0,.3);
  }
  .main-body{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s ease;
  }
  footer{
    width: 100%;
    *height:100px;
    background: #0b2e13;
  }

}



</style>
