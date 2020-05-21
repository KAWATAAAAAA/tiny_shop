<template>
  <div class="register-wrapper">

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="100px">
      <section><h1>美妆网注册</h1></section>
      <el-form-item label="手机号" prop="userPhoneNum" :class="{'base-info':true}" >
        <el-input placeholder="手机号" v-model="ruleForm.userPhoneNum"  />
      </el-form-item>
      <el-form-item label="密码" prop="userPassword" :class="{'base-info':true}" >
      <el-input placeholder="请输入密码" v-model="ruleForm.userPassword" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword" :class="{'base-info':true}" >
      <el-input placeholder="确认密码" v-model="ruleForm.checkPassword" />
      </el-form-item>
      <el-form-item label="昵称" prop="userNickName" :class="{'base-info':true}" >
        <el-input placeholder="昵称" v-model="ruleForm.userNickName"/>
      </el-form-item>
      <el-form-item label="真实姓名" prop="userRealName" :class="{'base-info':true}" >
        <el-input placeholder="真实姓名" v-model="ruleForm.userRealName"  />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="userEmail" :class="{'base-info':true}" >
        <el-input placeholder="个人常用邮箱" v-model="ruleForm.userEmail" />
      </el-form-item>
      <el-button type="primary"  class="submit" @click="submitForm('ruleForm')">注册</el-button>
      <div class="form-footer">

      </div>
    </el-form>
  </div>
</template>

<script>
  import Api from '../api'
  export default {
    name: 'Register',
    data(){
      let validateUserPhoneNum = (rule, value, callback) => {
        let reg = /^(\d){11}$/g
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入11位手机号码'));
          }
          else
            callback();
        }, 1000);
      };
      let validateUserPassword = (rule, value, callback) => {
        let reg  = /^(\w){6,16}$/
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入6-16位密码，可以是数字、字母、下划线,不包含空格'));
          }
          else
            callback();
        }, 1000);
      };
      let validateCheckPassword = (rule, value, callback) =>{
        if (value !== this.ruleForm.userPassword){
          callback(new Error('两次输入密码不一致!'))
        }
        else
          callback()
      };
      let validateUserNickName = (rule, value, callback) =>{
        callback()
      };
      let validateUserRealName = (rule, value, callback) =>{
        callback()
      };
      let validateUserEmail = (rule, value, callback) =>{
        let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(value)){
          callback(new Error('请输入格式正确的邮箱'))
        }
        callback()
      };

      return{
        ruleForm:{
          userPhoneNum:"",
          userPassword:"",
          checkPassword:"",
          userNickName:"",
          userRealName:"",
          userEmail:"",
        },
        rules: {
          userPhoneNum: [
            { validator: validateUserPhoneNum, trigger: 'blur' }
          ],
          userPassword: [
            { validator: validateUserPassword, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validateCheckPassword, trigger: 'blur' }
          ],
          userNickName:[
            {validator: validateUserNickName, trigger: 'blur' }
          ],
          userRealName:[
            {validator: validateUserRealName, trigger: 'blur' }
          ],
          userEmail:[
            {validator: validateUserEmail, trigger: 'blur' }
          ]
        },

      }

    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Api.signUp(this.ruleForm).then( res => {
              console.log(res)
              if (res.code === 10004)
              {
                this.$message({
                  type:'error',
                  message:res.message
                })
              }
              else
              {
                this.$message({
                  type:'success',
                  message:"注册成功，正在跳转！"
                })
                this.$router.push('/login')
              }
            }).catch(err =>{

            })
          } else {
            alert('请将数据填写完整')
            return false;
          }
        });
      },
    }
  }
</script>


<style scoped lang="scss">
  *{
    *border: 1px solid red;
  }
  .register-wrapper{
    width: 100%;
    height: calc(100vh - 45px);
    background: url("../assets/images/e9e146579d431a6d809a5451f48d29e8.png") no-repeat 80% 20% / 40%;
    background-color: #ffffff;
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
    height: auto;

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transform: translateX(50%) translateY(10%);
    .base-info{
      width: 80%;
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
  .register-wrapper{
    .base-info{
      input {

        line-height: 57px !important;
        height: 57px !important;

      }
      .el-input__clear{

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
    .el-form-item{
      width: auto;
      height: auto;
      position: relative;
    }
    .el-form-item__label{
      display: inline-block;
      position: absolute;
      left: -100px;
      top:50%;
      transform: translateY(-50%);
      font-size: 1.02rem;
    }
    .el-form-item__content{
      width: auto;
      height: auto;
      margin-left: 0 !important;
    }
  }
</style>



