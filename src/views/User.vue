<template>
    <div class="person-container">
     <div class="header">
       <div class="h-user">
         <div class="h-avatar" v-if="$route.params.id == user.userId" @click="$router.push({path:'/upload'})"><img :src="avatar" /></div>
         <div class="h-avatar-o"  v-else><img :src="avatar"></div>

         <div class="h-baseInfo">
           <div class="u-ctrl" v-if="$route.params.id == user.userId">
             <h3 class="u-name">{{user.userNickName}}</h3>
             <span class="u-intro">{{user.userIntro == "" ||user.userIntro == null?"这家伙很懒，什么都没留下":user.userIntro}}</span>
           </div>
           <div class="u-ctrl" v-else>
             <h3 class="u-name">{{otherUser.userNickName}}</h3>
             <span class="u-intro">{{otherUser.userIntro == "" ||otherUser.userIntro == null?"这家伙很懒，什么都没留下":otherUser.userIntro}}</span>
           </div>
         </div>
         <div class="ext-info" v-if="$route.params.id == user.userId">
           <el-dropdown trigger="click" :class="{'menu-wrapper':true}" :hide-on-click="true" placement="bottom">
              <span class="el-dropdown-link">
                更多信息<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
             <el-dropdown-menu slot="dropdown" :class="{'menu-area':true}">
               <el-dropdown-item icon="el-icon-edit-outline">
                 <router-link :to="{path:'/user/' + user.userId + '/edit'}">修改信息</router-link>
               </el-dropdown-item>
               <el-dropdown-item icon="iconfont ext-icon-shangjiaruzhu" v-if="!user.isSaler">
                 <router-link :to="{path:'/user/' + user.userId + '/store/edit'}">成为老板娘</router-link>
               </el-dropdown-item>
               <el-dropdown-item icon="iconfont ext-icon-shangjia" v-else>
                 <router-link :to="{path:'/store/' + user.userId}">我的小店</router-link>
               </el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
         </div>
         <div class="ext-info" v-else>
           <router-link :to="{path:'/chat'}">私信</router-link>
           <router-link :to="{path:'/chat'}">+好友</router-link>
         </div>
       </div>
       <div class="h-footer">
         <ul v-if="$route.params.id == user.userId">
           <li><router-link :to="{name:'BaseInfo'}"><i class="iconfont ext-icon-Personal" style="color: #02b5da"/>个人信息</router-link></li>
           <li><i class="iconfont ext-icon-iconset0316" style="color: #fb7299"/>购物袋</li>
           <li><i class="iconfont ext-icon-order" style="color: #00c091"/>订单列表</li>
           <li><i class="iconfont ext-icon-xihuan" style="color: #ff5d47"/>收藏</li>
           <li><router-link :to="{name:'AddressInfo'}"><i class="iconfont ext-icon-shouhuotuihuo" style="color: #FFCC33"/>我的收货地址</router-link></li>
         </ul>
         <ul v-else>
           <li><i class="iconfont ext-icon-Personal" style="color: #02b5da"/>个人信息</li>
         </ul>
       </div>
     </div>

      <div class="u-component-wrapper">
        <router-view :otherUser="otherUser"></router-view>
      </div>

    </div>
</template>

<script>
  import Api from '../api'
  import {mapState,mapActions} from 'vuex'

  export default {
    name: 'User',
    data(){
      return{
        otherUser:{
          userId:Number,
          userNickName:"",
          userAvatar:"",
          userGender:"",
          userIntro:"",
          userBirthday:""
        },
      }
    },
    computed:{
      ...mapState('userInfo',['user']),
      avatar(){
        if (this.$route.params.id == this.user.userId)
          return  this.user.userAvatar ==="" ||  this.user.userAvatar === null? require('../assets/images/normal_avatar.png'):this.user.userAvatar
        else
          return this.otherUser.userAvatar ==="" ||  this.otherUser.userAvatar === null? require('../assets/images/normal_avatar.png'):this.otherUser.userAvatar
      }
    },
    watch:{
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(to)
        if (to.params.id === this.user.userId){
          alert("是同一个用户")
        }
      }
    },
    beforeRouteUpdate(to,from,next){

      console.log(to)
      next()
    },
    methods:{
      ...mapActions('userInfo',['setUserInfo'])
    },
    created () {
      console.log("user 组件被创建")
      console.log(this.user.userId)
      console.log(this.$route.params.id)
      console.log(this.$route.params.id == this.user.userId)
      if (this.$route.params.id != this.user.userId){ // 查询的是其他用户的信息，带上id
        let data = {
          id:this.$route.params.id
        }
        Api.getUserInfo(data).then( res => {
          console.log(res)
          if (res.code === 200)
          {
            this.otherUser.userAvatar = res.data.userAvatar
            this.otherUser.userId = res.data.userId
            this.otherUser.userNickName = res.data.userNickName
            this.otherUser.userGender = res.data.userGender
            this.otherUser.userIntro = res.data.userIntro
            this.otherUser.userBirthday = res.data.userBirthday
          }
        }).catch( err => {
          console.log(err)
        })
      }
      else {
        Api.getUserInfo().then(res =>{
          console.log(res)
          let data = res.data
          this.setUserInfo({data})
        }).catch( err=>{
          console.log(err)
        })
      }

    }
  }
</script>

<style scoped lang="scss">

  *{
    *border:1px solid red;
  }

.person-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .header{
    width: 1120px;
    height: 260px;
    background-image: url("../assets/images/mask.png"), url("../assets/images/person_h.jpg")
  ;
    margin-top: 10px;
    background-repeat:no-repeat ,no-repeat;
    background-position: 0px bottom,0px 0px;
    background-size: 100% ,100% 200px ;
    transition: background-image .2s ease,background-size 1s ease;
    box-shadow: 0 2px 12px -8px rgba(0,0,0,.5);
    border-radius: 5px 5px 0 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-end;
    .h-user{
      width: 100%;
      height: 84px;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      .h-avatar{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-left: 2rem;
        position: relative;
        background: #ffffff;
        &::before{
          display:none;
          content: '更换头像';
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.5);
          color: #ffffff;
          text-align: center;
          border-radius: 50%;
          font-size: .5rem;
          line-height:5.5;
          position: absolute;
          top: 0;
          left: 0;
        }
        &:hover{
          cursor: pointer;
        }
        &:hover::before{
          display: block;
          z-index: 1;
        }
        img{
          width:100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .h-avatar-o{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-left: 2rem;
        background: #ffffff;
        position: relative;
        img{
          width:100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .h-baseInfo{
        width: 50%;
        height: 64px;
        .u-ctrl{
          width: 50%;
          height: 100%;
          padding-left: 1rem;
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          flex-wrap: wrap;
          flex-direction: column;
          color: #ffffff;
          .u-intro{
            font-size: .8rem;
          }
        }
      }
      .ext-info{
        display: flex;
        justify-content: center;
        align-items: center;
        background:rgba(0,0,0,.5);
        padding: .5rem .8rem;
        color: #ffffff;
        border-radius: 5px;
        position: absolute;
        right: 10%;
        .menu-wrapper{
          width: 100%;
          height: 100%;
        }
        .el-dropdown-link{
          width: 100%;
          height: 100%;
          color: #ffffff;
        }
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
  .h-footer{
    width: 1120px;
    height: 60px;
    background: #ffffff;
    box-shadow: 0 2px 12px -8px rgba(0,0,0,.5);
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      li{
        width: 225px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;

        &:hover{
          cursor: pointer;
        }
        .iconfont{
          font-size: 1.3rem;
          margin-right: .5rem;
          vertical-align: middle;
        }
      }
    }
  }
  .u-component-wrapper{
    margin-top: 10px;
    width: 1120px;
    height: auto;
    box-shadow: 0 2px 12px -8px rgba(0,0,0,.5);
  }
  @media (min-width: 1420px){
    .header,.h-footer,.u-component-wrapper{
      width: 1280px!important;
    }
  }
}

</style>
<style lang="scss">
  .menu-area{
    width: 8rem;
    .el-dropdown-menu__item{
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 .8rem;
      i{
        font-size: 1.5rem;

      }

    }
  }
</style>
