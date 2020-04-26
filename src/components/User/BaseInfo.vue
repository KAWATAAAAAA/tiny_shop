<template>
    <div class="info-container">
      <ul v-if="$route.params.userId == user.userId" class="info-wrapper">
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-nicheng" id="ext-icon-nicheng"></use>
            </svg>昵称
          </span>{{user.userNickName}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-id"></use>
            </svg>姓名
          </span>
          {{user.userRealName}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-gender"></use>
            </svg>性别
          </span>
          <svg class="icon" aria-hidden="true" v-if="user.userGender === '男'">
            <use xlink:href="#ext-icon-xingbienan" id="ext-icon-xingbienan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="user.userGender === '女'">
            <use xlink:href="#ext-icon-xingbienv" id="ext-icon-xingbienv"></use>
          </svg>
          {{user.userGender == "" || user.userGender == null?"不详":""}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-shengri" id="ext-icon-shengri"></use>
            </svg>生日
          </span>
          {{$moment(user.userBirthday == "" || user.userBirthday == null?"未知":user.userBirthday).format("YYYY-MM-DD")}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-shouji2" id="ext-icon-shouji2"></use>
            </svg>手机
          </span>
          {{user.userPhoneNum}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href=#ext-icon-youxiang1 id="ext-icon-youxiang1"></use>
            </svg>邮箱
          </span>{{user.userEmail}}
        </li>

      </ul>
      <ul v-else class="info-wrapper other">
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-nicheng" id="ext-icon-nicheng"></use>
            </svg>昵称
          </span>{{otherUser.userNickName}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-gender"></use>
            </svg>性别
          </span>
          <svg class="icon" aria-hidden="true" v-if="user.userGender === '男'">
            <use xlink:href="#ext-icon-xingbienan" id="ext-icon-xingbienan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="user.userGender === '女'">
            <use xlink:href="#ext-icon-xingbienv" id="ext-icon-xingbienv"></use>
          </svg>
          {{otherUser.userGender == "" || user.userGender == null?"不详":""}}
        </li>
        <li>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#ext-icon-shengri" id="ext-icon-shengri"></use>
            </svg>生日
          </span>
          {{$moment(otherUser.userBirthday == "" || user.userBirthday == null?"未知":user.userBirthday).format("YYYY-MM-DD")}}
        </li>
      </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'BaseInfo',
    props:{
      otherUser:{
        type:Object,
        required: true
      }
    },
    computed:{
      ...mapState('userInfo',['user'])
    }
  }
</script>

<style scoped lang="scss">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  #ext-icon-nicheng{
    fill: rgb(0, 192, 145);
  }

  #ext-icon-shengri{
    fill: rgb(255, 77, 116);
  }
  #ext-icon-shouji2{
    fill: #03a9f4;
  }
  #ext-icon-youxiang1{
    fill: #666666;
  }
.info-container{
  width: 100%;
  height: 400px;
  background: #ffffff;
  position: relative;
  .info-wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 1rem;
    li{
      list-style: none;
      *border:1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      span{
        text-align: right;
        display: inline-block;
        vertical-align: middle;
        width: 150px;
        padding-right: 2rem;
        svg{
          font-size: 1.4rem;
          transform: translateY(2.5px);
          margin-right: 1rem;
        }
      }
      svg{
        font-size: 1.5rem;
        transform: translateY(2.5px);
        margin-right: 1rem;
      }
    }
  }
  .other{
    height: 50%;
    position:absolute;
    top:50%;
    transform:translateY(-50%);
  }
}
</style>
