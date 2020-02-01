<template>
    <div class="person-container">
     <div class="header">
       <div class="h-user">
         <div class="h-avatar" @click="upload"><img :src="user.userAvatar"></div>
         <div class="h-baseInfo"></div>
       </div>
     </div>
      <router-view />
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Person',
    computed:{
      ...mapState('userInfo',['user'])
    },
    methods:{
      upload(){
        this.$router.push('/Upload')
      }
    }
  }
</script>

<style scoped lang="scss">
.person-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border:1px solid red;
  .header{
    width: 1120px;
    height: 200px;
    border:1px solid red;
    background-image: url("../assets/images/mask.png"), url("../assets/images/cb1c3ef50e22b6096fde67febe863494caefebad.png")

  ;
    background-repeat:no-repeat ,repeat;
    background-position: 0px bottom,50% ;
    background-size: 0 / cover ;
    transition: background-image .2s ease,background-size 1s ease;
    padding-top: 116px;
    position: relative;

    .h-user{
      width: 100%;
      height: 84px;
      border:1px solid red;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      .h-avatar{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-left: 2rem;
        position: relative;
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
    }
  }
  @media (min-width: 1420px){
    .header{
      width: 1280px!important;
    }
  }
}

</style>
