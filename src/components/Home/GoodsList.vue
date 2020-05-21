<template>
    <div class="goods-list">
      <div v-for="(item,index) in userList" :key="index" class="user-item" @click="handleChatLink(item)">
        <span><img :src="item.userAvatar"></span>
        <span>{{item.userNickName}}</span>
        <span>
          <svg class="icon" aria-hidden="true" v-if="item.userGender === '男'">
            <use xlink:href="#ext-icon-xingbienan" id="ext-icon-xingbienan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.userGender === '女'">
            <use xlink:href="#ext-icon-xingbienv" id="ext-icon-xingbienv"></use>
          </svg>
        </span>
        <span style="color: #666666">{{item.userIntro}}</span>
        <span v-if="item.isSaler"><i class="iconfont ext-icon-shangjiarenzheng"></i></span>
      </div>
    </div>
</template>

<script>
  import Api from '../../api'
  export default {
    name: 'GoodsList',
    data(){
      return{
        userList:[]
      }
    },
    mounted () {
      Api.getActiveUserList().then(res=>{
        console.log(res)
        if (res.code === 200)
        {
          this.userList = res.data
        }
      })

    },
    methods:{
      handleChatLink(user){
        console.log(user)
      }
    }
  }
</script>

<style scoped lang="scss">
.goods-list{

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  width:100%;
  height: 900px;
  background: white;
  *border:1px solid red;
  .user-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    //box-shadow: 0px 0px 15px -8px rgba(0,0,0,.5);
    &:hover{
      cursor: pointer;
    }
    border-top:1px solid #f5f2f0;
    > span:first-child{
      img{
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    span{

      min-width:5rem ;
      *border:1px solid red;
      svg{
        font-size: 1.25rem;
        transform: translateY(2.5px);

      }
      i{
        font-size: 1.25rem;
        color: #01b9ff;
      }
    }
  }
}
</style>
