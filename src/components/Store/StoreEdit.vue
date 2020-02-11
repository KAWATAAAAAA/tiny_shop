<template>
  <div class="store-edit-container">
    <el-form :model="storeInfo" :rules="rules" ref="storeInfo" :class="{form:true}" status-icon class="demo-ruleForm" label-width="100px">
      <el-form-item label="店铺Logo :">
        <el-upload
          class="avatar-uploader"
          action=""
          :headers="headers"
          :show-file-list="false"
          :http-request="uploadFile"
          :before-upload="beforeLogoUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺名称 :" prop="storeName">
        <el-input v-model="storeInfo.storeName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述 :" prop="storeDesc">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="storeInfo.storeDesc"
          maxlength="50"
          show-word-limit
          resize="none"
          :class="{'user-intro':true}"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="店主姓名 :" prop="ownerRealName">
        <el-input v-model="storeInfo.ownerRealName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码 :" prop="idCardNumber">
        <el-input v-model="storeInfo.idCardNumber" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label=" " prop="accept">
        <el-checkbox-group v-model="storeInfo.accept">
          <el-checkbox label="我已阅读" name="accept">我已阅读<router-link to="">《平台开店协议》</router-link></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('storeInfo')">立即保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Api from '../../api'
  export default {
    name: 'StoreEdit',
    data () {
      let valiStoreName = (rule, value, callback) => {
       setTimeout(() => {
          if (value.length < 1) {
            console.log('err')
            callback(new Error('请输入至少一位字符作为名称'));
          }
          else
            callback();
        }, 1000);
      };
      let valiStoreDesc = (rule, value, callback) => {
        setTimeout( ()=>{
          if (value.length == 0 || value.length > 50)
          {
            callback(new Error(" 有效字符长度 0 ~ 50"))
          }
          else
            callback()
        },1000)
      };
      let valiOwnerRealName = (rule, value, callback) => {
        let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10})*$/
        setTimeout( ()=>{
          if (!reg.test(value))
          {
            callback(new Error("有效字符长度2 ~ 20,且不得有特殊字符"))
          }
          else
            callback()
        },1000)
      };
      let valiIdCardNumber = (rule, value, callback) => {
        let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/

        setTimeout( ()=>{
          if (!reg.test(value))
          {

            callback(new Error("有效字符长度18位"))
          }
          else if (new Date().getFullYear() - parseInt(reg.exec(value)['2']) >= 18)
            callback()
          else
            callback(new Error("未成年"))
        },1000)
      };
      let valiAccept = (rule, value, callback) =>{
        setTimeout( ()=>{
          if (value)
            callback()
          else
            callback(new Error("请查看协议并勾选"))
        },1000)
      }
      return {
        storeInfo:{
          storeLogo:"",
          storeName:"",
          storeDesc:"",
          ownerRealName:"",
          idCardNumber:"",
          accept:""
        },
        rules:{
          storeName: [
            { validator: valiStoreName, trigger: 'blur' }
          ],
          storeDesc: [
            { validator: valiStoreDesc, trigger: 'blur' }
          ],
          ownerRealName: [
            { validator: valiOwnerRealName, trigger: 'blur' }
          ],
          idCardNumber: [
            { validator: valiIdCardNumber, trigger: 'blur' }
          ],
          accept: [
            { validator: valiAccept, trigger: 'blur' }
          ]
        },
        imageUrl: '',
      };
    },
    computed:{
      ...mapState('commonState',['token']),
      ...mapState('userInfo',['user']),
      headers(){
        return{
          'Authorization':this.token
        }
      }
    },
    methods:{
      ...mapActions('userInfo',['setUserInfo']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Api.settledIn(this.storeInfo).then( res =>{
              console.log(res)

              this.$router.push({name:'Store'})

            }).catch( err =>{
              console.log(err)
            })
          } else {
            alert('请将数据填写完整')
            return false;
          }
        });
      },
      //自定义实现覆盖默认的上传操作
      uploadFile(param){
        // 创建表单对象
        let formData = new FormData();
        formData.append("file",param.file)
        Api.uploadStoreLogo(formData).then( response =>{
          console.log(response)
          if(response.code === 200)
          {

            this.imageUrl = response.filepath
            this.storeInfo.storeLogo = response.filepath
            this.$message({
              type:'success',
              message:'上传成功！'
            })

          }
          else
          {
            this.$message({
              type:'error',
              message:'上传失败！'
            })
          }
        }).catch(error =>{
          console.log(error)
        })
      },
      beforeLogoUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },

  }
</script>

<style scoped lang="scss">
  *{
    *border:1px solid red;
  }
  .store-edit-container{
    background: #ffffff;
    width: 100%;
    min-height: 600px;

    position: relative;
    border-radius: 0 0 10px 10px;
    .form{
      width: 500px;
      min-height:600px;
      position:absolute;
      padding: 3rem 2rem;
      top:50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
      .avatar-uploader{
        width: 80px;
        height: 80px;
        border: 1px dashed #cccccc;
        border-radius: 5px;
      }
      .user-intro{
        width: 300px;
      }
    }
  }
</style>
<style lang="scss">
  .store-edit-container{
    .el-upload{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-form-item{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-upload{
        img{
          width: 100%;
          height: 100%;
        }
      }
      .el-form-item__content{
        margin-left: 0 !important;
        .el-input__inner{
          width: 250px;
        }
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
