<template>
  <div class="login-wrapper">

    <el-form ref="form" :model="form">
      <section><h1>欢迎回来！</h1></section>
      <el-input placeholder="手机号" v-model="form.userPhoneNum"  :class="{'base-info':true}"/>
      <el-input placeholder="请输入密码" v-model="form.userPassword" show-password  :class="{'base-info':true}"/>
      <el-button type="primary" @click="signIn" class="submit">立即登录</el-button>
      <div class="form-footer">
        <p><router-link to="/">忘记密码？</router-link></p>
        <p @click="getPublicKey">还没有账户？<router-link :to="{name:'Register'}">现在创建账户</router-link></p>
      </div>
    </el-form>
  </div>
</template>

<script>


  import Api from '../api'
  import {mapActions,mapState} from 'vuex'

  export default {
    created() {
      console.log("login created")
      let that = this;
      document.onkeypress = function(e) {
        var keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
          that.signIn();// 登录方法名
          return false;
        }
      };
    },
    name: 'Login',
    data(){
      return{
        form:{
          userPhoneNum:"",
          userPassword:""
        },

      }
    },
    computed:{
      ...mapState('userInfo',['user']),
      ...mapState('commonState',['token'])
    },
    methods:{
      ...mapActions('commonState',['setToken']),
      ...mapActions('userInfo',['setStatus','setUserInfo']),
      signIn(){
        let msg = {
          userPhoneNum:this.form.userPhoneNum,
          userPassword:this.form.userPassword
        }
        if(this.user.status){
          this.$message({
            type:'warning',
            message:'请勿重复登录！'
          })
          this.$router.push('/')
          return ;
        }
        else
        Api.signIn(msg).then((response)=>{
          console.log(response)
          if (response.code === 200)
          {
            let data = response.data

            window.localStorage.setItem('token',data.token)
            window.sessionStorage.setItem('userStatus',JSON.stringify(true))
            this.setToken(data) //记录token
            this.setStatus() // 设置用户状态
            this.setUserInfo({data})
            this.$message({
              type:'success',
              message:'登录成功！'
            })
            setTimeout(()=>{
              this.$router.push('/')
            },2000) //2000
          }
          else{
            this.$message({
              type:'error',
              message:'登录失败！' + response.message
            })
          }

        }).catch((error)=>{
          console.log(error)
        })
      },
      getPublicKey(){

        Api.getPublicKey().then( response =>{
          console.log(response)
        }).catch(error =>{
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  *{
    *border: 1px solid red;
  }
  .login-wrapper{
    width: 100%;
    height: calc(100vh - 45px);
    background: #FFffff url("../assets/images/login_bg.png") no-repeat 100% 100%;
    position: relative;

    section{
      display: block;
      width: 100%;
      text-align: left;
      font-size: 2rem;
      margin-top: 0;
      margin-bottom: 40px;
      h1{
        display: inline-block;
        text-indent: 60px;

      }
    }
  }
.el-form{
  width: 520px;
  height: 500px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transform: translateX(50%) translateY(50%);
  .base-info{
    width: 80%;
    height: 57px;
    margin: 0 0 20px 0;

  }
  .submit{
    width: 80%;
    height: 57px;
    padding: 0 15px;
    border: none;
    opacity:.65;
    font-size: 1.2rem;
    background: #ef3420;
    margin-top: 10px;
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,.5);
    &:active{
      box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
    }
  }
  .form-footer{
    width: 80%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    p{
      display: block;
      padding: .8rem 0;

      a{
        text-decoration: none;
        color: #139af9;
      }
    }
  }
}
  @media screen and (max-width: 375px){
    .el-form{
      width: 100%;

      position: absolute;
      top: 50%;
      transform: translateX(0) translateY(-50%);
    }
    .login-wrapper{
      background: #FFffff ;
    }
  }
</style>
<style lang="scss">
  .login-wrapper{
    .base-info{
      input {

        line-height: 57px !important;
        height: 57px !important;

      }
        .el-input__clear{ /*eye*/
          position: relative;
          width: 3rem;
          font-size: 1.3rem;
          &::before{
            position:absolute;
            left:50%;
            top:50%;
            transform:translateX(-50%) translateY(-50%);

          }
      }
    }
  }
</style>
