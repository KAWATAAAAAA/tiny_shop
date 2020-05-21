<template>
    <div class="edit-container">
        <el-form :model="newInfo" :class="{form:true}" label-width="100px">
          <el-form-item label="昵称">
            <el-input v-model="newInfo.userNickName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="newInfo.userGender">
              <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button>
              <el-radio-button label="保密"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="newInfo.userBirthday"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="newInfo.userIntro"
              maxlength="50"
              show-word-limit
              resize="none"
              :class="{'user-intro':true}"
            >
            </el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="onSubmit">立即保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Api from '../../api'
  export default {
    name: 'InfoEdit',
    data () {
      return {
        newInfo:{
          userNickName:"",
          userGender:"保密",
          userBirthday:"",
          userIntro:""
        }
      };
    },
    computed:{
      ...mapState('userInfo',['user'])
    },
    methods:{
      ...mapActions('userInfo',['setUserInfo']),
      onSubmit(){
        Api.updateUserInfo(this.newInfo).then( res =>{
          console.log(res)
          if (res.code === 200)
          {
            let data = this.newInfo
            this.setUserInfo({data})
            this.$message({
              type:'success',
              message:'修改成功'
            })
          }
        }).catch( err =>{

        })
      }
    },
    mounted () {
      this.newInfo.userNickName = this.user.userNickName
      this.newInfo.userGender = this.user.userGender
      this.newInfo.userBirthday = this.user.userBirthday
      this.newInfo.userIntro = this.user.userIntro
    }
  }
</script>

<style scoped lang="scss">
  *{
    *border:1px solid red;
  }
.edit-container{
  background: #ffffff;
  width: 100%;
  height: 500px;
  position: relative;
  border-radius: 0 0 10px 10px;
  .form{
    width: 500px;
    height: 100%;
    position:absolute;
    padding: 3rem 2rem;
*border:1px solid red;
    top:50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;

    .user-intro{
      width: 300px;
    }
  }
}
</style>
<style lang="scss">
  .edit-container{
    .el-form-item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-form-item__content{
        margin-left: 0 !important;
      }
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #FFF;
      background-color: #ff336680;
      border-color: rgba(0,0,0,0);
      outline: none;
      -webkit-box-shadow: -1px 0 0 0 #ff336680;
      box-shadow: -1px 0 0 0 #ff336680;
    }
    .el-button--primary {
      color: #FFF;
      background-color: #ff336680;
      border-color: rgba(0,0,0,0);
      &:hover{
        background-color: #ff3366;
        border-color: rgba(0,0,0,0);
      }
    }
  }
</style>
