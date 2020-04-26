<template>
    <ul class="user-info-container">
      <li class="user-info" v-if="user.status">
        {{user.userNickName}}
        <i class="el-icon-arrow-down" style="font-size: 1.25rem"/>
        <ul class="sub-info">
          <li class="user-status">
            <div class="head-img">
              <router-link :to="{path:'/user/' + user.userId}">
                <img :src="avatar" />
              </router-link>
            </div>
            <div>

            </div>
          </li>
          <li>
            <i class="el-icon-s-comment" />
            我的评价
          </li>
          <li @click="toOrderHistory">
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

        <router-link :to="{name:'Login'}">请登录！</router-link>
        <i class="iconfont ext-icon-Personal" />
      </li>
      <li class="message-container" @click="$router.push('/chat')">
        消息
        <i class="iconfont ext-icon-xiaoxi1" />
      </li>
      <li class="shopping-cart" @click="showCart">
        购物袋<span class="g-total" v-show="totalItemGetter > 0">{{totalItemGetter}}</span>
        <i class="iconfont ext-icon-iconset0316" />
      </li>
    </ul>
</template>

<script>
  import {mapActions,mapState,mapGetters} from 'vuex'
  import Api from '../../api'
  export default {
    name: 'UserStatusBar',
    data(){
      return{
        isShow:true,//购物车
      }
    },
    computed:{
      ...mapGetters('cartState',['totalItemGetter']),
      ...mapState('userInfo',['user']),
      avatar(){
        return  this.user.userAvatar ==="" ||  this.user.userAvatar === null? require('../../assets/images/normal_avatar.png'):this.user.userAvatar
      }
    },
    methods:{
      ...mapActions('commonState',['showCart','setToken']),
      ...mapActions('userInfo',['removeStatus','setUserInfo']),
      show(){
        this.isShow = !this.isShow
      },
      toOrderHistory(){
        this.$router.push(`/user/${this.user.userId}/order-history`)
      },
      logout(){
        this.removeStatus()
        window.localStorage.removeItem('token')
        window.sessionStorage.removeItem('userStatus')
        this.$router.go(0)
      }
    },
    created () {
      //在创建组件之后（挂载模板到页面之前），要拿到用户数据
      /*有token则发送请求 获取信息，没有token则跳转登陆*/
      let token = window.localStorage.getItem('token')
      if (token !== null)
      {
        /*
        * 将内容转至 vuex 的 actions
        * */
       this.setUserInfo().then(res=>{

         this.setToken(token)
       }).catch(err=>{
         console.log(err)
       })

      }

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
    font-size: 0.9rem;
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
  .shopping-cart{
    position: relative;
    .g-total{
      color: #ffffff;
      border-radius: 50%;
      font-size: .5rem;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      background: #F40;
      position: absolute;
      right: 5%;
      top: 10%;
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
        background: #ffffff;
        box-shadow: 0px 2px 10px -8px rgba(0,0,0,5);

        img{
          width: 100%;
          height: 100%;
          border-radius:50% ;
        }
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
