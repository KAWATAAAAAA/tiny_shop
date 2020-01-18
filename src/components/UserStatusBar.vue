<template>
    <ul class="user-info-container">
      <li class="user-info" v-if="user.status">
        wuyuwei2016
        <i class="el-icon-arrow-down" style="font-size: 1.25rem"/>
        <ul class="sub-info">
          <li class="user-status">
            <div class="head-img"></div>
          </li>
          <li>
            <i class="el-icon-s-comment" />
            我的评价
          </li>
          <li>
            <i class="el-icon-s-order" />
            历史订单
          </li>
          <li class="exit" @click="logout">
            <i class="el-icon-switch-button" />
            退出登录
          </li>
        </ul>
      </li>
      <li class="user-info" v-else>

        <router-link to="Login">请登录！</router-link>
        <i class="iconfont ext-icon-Personal" />
      </li>
      <li class="message-container">
        消息
        <i class="iconfont ext-icon-xiaoxi1" />
      </li>
      <li class="shopping-cart" @click="showCart">
        购物袋
        <i class="iconfont ext-icon-iconset0316" />
      </li>
    </ul>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
  import Api from '../api'
  export default {
    name: 'UserStatusBar',
    data(){
      return{
        isShow:true
      }
    },
    computed:{
      ...mapState('userInfo',['user'])
    },
    methods:{
      ...mapActions('commonState',['showCart']),
      ...mapActions('userInfo',['removeStatus']),
      show(){
        this.isShow = !this.isShow
      },
      logout(){
        this.removeStatus()
        window.localStorage.removeItem('token')
        this.$router.go(0)
      }

    },
    beforeMount () {
      //在挂载模板之前，要拿到用户数据
      console.log("在挂载模板之前，要拿到用户数据")
      if (window.localStorage.getItem('token'))
      {
        console.log(window.localStorage.getItem('token'))
        Api.getUserInfo().then( response =>{
          console.log(response)
        }).catch( error =>{
          console.log(error)
        })
      }
    },
    mounted () {
      console.log("状态栏组件被加载")
    }
  }
</script>

<style scoped lang="scss">
.user-info-container{
  width:360px;
  height: 100%;

  margin-bottom:0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .iconfont{
    font-size: 1.25rem;
  }
  li{
    display: flex;
    justify-content: center;

    align-items: center;
    padding: 0 20px;
    height: 100%;
    &:hover{
      cursor: pointer;
    }
    &:hover > svg path{
      color: red;
      fill:red;
    }
    svg{
      margin-left: .5rem;
    }
    i{
      margin-left: .5rem;
    }
  }
}
.user-info{
  width: 150px;
  position: relative;
  a{
    text-decoration: none;
    color: black;
  }
  .sub-info{
    display: flex;
    opacity: 0;
    width:200px;
    height: 300px;

    *border-top: 2px solid #f85959;

    flex-direction:column;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    bottom: 0;
    background:white;
    box-shadow: 2px 5px 10px -10px rgba(0,0,0,.9),
    -2px 0px 10px -10px rgba(0,0,0,.9)
  ;
    z-index: 999;
    transition: all .5s ease;

    li{
      width: 100%;
      height: 15%;
      display: flex;
      justify-content: left;
      transition: all .4s ease;
      i{
        color: #666666;
        margin-right: 1.3rem;
        font-size: 1.3rem;
      }
      &:hover{
        color: #42b983;
      }
      &:hover i{
        color: #42b983;
      }
    }
    .user-status{
      display: flex;
      height: 55%;
      border-bottom:1px solid #f4f4f4;
      background: rgba(0,0,0,.7);
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      position: relative;
      .head-img{
        width: 68px;
        height: 68px;
        margin: 0;
        padding: 0;
        position:absolute;
        left:50%;
        top:-15%;
        border-radius: 50%;
        transform:translateX(-50%);
        background: #42b983;
      }
    }
    .exit{
      display: flex;
      justify-content: left;
      width: 100%;
      border-top:1px solid #f4f4f4;

    }
  }
  &:hover .sub-info{

    transform: translateY(105%);
    opacity: 1;
  }
  .el-icon-arrow-down{
    transition: all .5s ease;

  }
  &:hover .el-icon-arrow-down{
    transform: rotate(-90deg);
    color: #007bff;
    font-weight: bold;
  }
}
</style>
