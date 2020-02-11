<template>
    <div class="status">
      <img src="../assets/logo.png" @click="toHome" alt="logo">
      <Search />
      <keep-alive>
        <UserStatusBar/>
      </keep-alive>

    </div>
</template>

<script>
  import Search from '../components/Header/Search'
  import UserStatusBar from '../components/Header/UserStatusBar'
  export default {
    name: 'Header',
    components:{
      Search,
      UserStatusBar
    },
    methods:{
      toHome(){
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .status{
    width:1200px;
    height: 45px;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    img{
      display: block;
      transform: scale(0.35) translateX(-250%) translateY(-65%);
      position: absolute;
      top: 0;
      left: 0;
      &:hover{
         cursor: pointer;
       }
    }
  }
</style>
