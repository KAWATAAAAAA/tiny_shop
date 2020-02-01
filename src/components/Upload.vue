<template>
    <div class="avatar-container">
      <el-upload
        class="avatar-uploader"
        action=""
        :headers="headers"
        :show-file-list="true"
        :http-request="uploadFile"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Api from '../api'
  export default {
    name: 'upload',
    data() {
      return {
        imageUrl: '',
      }
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
    methods: {
      //自定义实现覆盖默认的上传操作
      uploadFile(param){
        // 创建表单对象
        console.log(param.file)
        let formData = new FormData();
        formData.append("file",param.file)
        console.log(param,formData)
        Api.uploadAvatar(formData).then( response =>{
          console.log(response)
          if(response.code === 200)
          {
            this.user.userAvatar = response.filepath
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
      beforeAvatarUpload(file) {
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
    }
  }
</script>

<style lang="scss">
  .avatar-container{
    background: #ffffff;
    width: 800px;
    height: 600px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
