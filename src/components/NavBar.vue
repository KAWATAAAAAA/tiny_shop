<template>
  <nav>
    <ul v-if="false">
      <li>
        <i class="el-icon-s-home" />
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <i class="el-icon-s-promotion" />
        <router-link to="/news">发现</router-link>
      </li>
    </ul>

  </nav>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style scoped lang="scss">
  nav {
    flex-grow: 1;
    height: 45px;
    display: flex;
    justify-content: space-around;

    margin-right: 20px;
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
        i{
          color: #999999;
          margin-right: .5rem;
          font-size: 1.3rem;
        }
        a{
          font-size:1rem ;
        }

        &::after{
          content: '';
          width: 0;
          height: 0;
          opacity: 0;
          border-bottom: 1px solid red;
          position: absolute;
          left: 0;
          bottom: 0;
          transform: translateX(-100%);
          transition:all 0.3s cubic-bezier(.22,.5,.16,1.66)
        ;
        }
        &:hover::after{
          opacity: 1;
          width: 100%;
          transform: translateX(0) scale(1.1);

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


  }
</style>
