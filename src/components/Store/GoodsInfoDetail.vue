<template>
  <div class="add-goods-container">
    <el-form :model="goodsInfo" ref="goodsInfo" :class="{form:true}" status-icon class="demo-ruleForm" label-width="100px">
      <img :src="goodsInfo.goodsPreviewImg" style="width: 80px;height: 80px">
      <el-form-item label="预览图修改:" >
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
      <el-form-item label="宝贝名称 :" prop="goodsName">
        <el-input v-model="goodsInfo.goodsName" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="宝贝单价 :" prop="goodsPrice">
        <el-input v-model.number="goodsInfo.goodsPrice" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="库存数 :" prop="goodsNum">
        <el-input v-model.number="goodsInfo.goodsNum" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="宝贝标签">
        <TagsEdit :dynamicTags="dynamicTags" @addDynamicTag="addDynamicTag" @removeDynamicTag="removeDynamicTag" @collectDynamicTag="collectDynamicTag"/>
      </el-form-item>
      <el-form-item label="显色度" prop="colorRate">
        <el-rate v-model="goodsInfo.colorRate"></el-rate>
      </el-form-item>
      <el-form-item label="持久度" prop="holdRate">
        <el-rate v-model="goodsInfo.holdRate"></el-rate>
      </el-form-item>
      <el-form-item label="滋润度" prop="waterRate">
        <el-rate v-model="goodsInfo.waterRate"></el-rate>
      </el-form-item>
      <el-form-item label="顺滑度"  prop="smoothRate">
        <el-rate v-model="goodsInfo.smoothRate"></el-rate>
      </el-form-item>
      <el-form-item label="产品规格" prop="productSpe">
        <el-input v-model.number="goodsInfo.productSpe" placeholder="请输入规格">
          <el-button slot="append">g</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="保质期" prop="ExpTimeNum">
        <el-input v-model.number="goodsInfo.expTimeNum" placeholder="请输入规格">
          <el-button slot="append">个月</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="产品介绍" prop="goodsDesc">
        <el-input type="textarea" v-model="goodsInfo.goodsDesc" :autosize="{ minRows: 2, maxRows: 16 }"></el-input>
      </el-form-item>
      <el-form-item label="温馨提示" prop="goodsTips">
        <el-input type="textarea" v-model="goodsInfo.goodsTips"></el-input>
      </el-form-item>

      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('goodsInfo')">立即保存</el-button>
        <el-button type="danger" @click="handelDeleted">删除</el-button>
        <el-button @click="$emit('handelDialogClose')">取消</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Api from '../../api'
  import TagsEdit from './TagsEdit'
  export default {
    name: 'GoodsInfoDetail',
    components:{
      TagsEdit
    },
    props:{
      goodsInfo:[Object]
    },
    data () {
      return {
       /* goodsInfo:{
          goodsPreviewImg:"",
          goodsName:"",
          goodsPrice:"",
          goodsNum:"",
          goodsLabel:[],
          storeId:this.$route.params.storeId,
          storeName:sessionStorage.getItem('store_name'),
          accept:"",
          colorRate:0,
          holdRate:0,
          waterRate:0,
          smoothRate:0,
          productSpe:0,
          ExpTimeNum:0,
          goodsDesc:"",
          goodsTips:""
        },*/

        imageUrl: '',
        /*children component state*/
        dynamicTags:[
          { id:1, type: '', label: '美瞳' ,effect:'plain'},
          { id:2, type: 'success', label: '眉笔',effect:'plain' },
          { id:3, type: 'info', label: '口红' ,effect:'plain'},
          { id:4, type: 'danger', label: '眼影' ,effect:'plain'},
          { id:5, type: 'success', label: '睫毛',effect:'plain' }
        ]
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

            console.log(this.goodsInfo)
            Api.updateGoodsInfo(this.goodsInfo).then( res=>{
              if (res.code === 200){
                this.$message({
                  type:'success',
                  message:res.data
                })
                this.$emit('handelDialogClose')
              }
            }).catch( err =>{
              console.log(err)
            })

        });
      },
      handelDeleted(){
        Api.deleteGoodsInfo(this.goodsInfo).then( res=>{
          if (res.code === 200){
            this.$message({
              type:'success',
              message:res.data
            })
            this.$emit('handelDialogClose')
            this.$emit('reTodoInit')
          }
        }).catch( err =>{
          console.log(err)
        })
      },
      //自定义实现覆盖默认的上传操作
      uploadFile(param){
        // 创建表单对象
        let formData = new FormData();
        formData.append("file",param.file)
        Api.uploadGoodsPreviewImg(formData).then( response =>{
          console.log(response)
          if(response.code === 200)
          {

            this.imageUrl = response.filepath
            this.goodsInfo.goodsPreviewImg = response.filepath
            this.$message({
              type:'success',
              message:'上传成功！'
            })
            let reg  = /(.png)|(.jpg)/
            this.goodsInfo.goodsName = param.file.name.replace(reg,'')
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
        console.log(file.type)
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /* 子组件状态管理*/
      addDynamicTag(val){
        console.log("父组件改变值")
        let inputValue = {
          id:this.dynamicTags.length + 1,
          type:'',
          label:val,
          effect:'dark'
        }
        if (inputValue) {
          this.dynamicTags.push(inputValue);
          this.goodsInfo.goodsLabel.push(val)
        }
        // this.inputValue = '';
      },
      removeDynamicTag(tag){
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      collectDynamicTag(tag,ref){
        let obj = this.dynamicTags[tag.id - 1]
        obj.effect = obj.effect === "plain"?"dark":"plain"
        if (obj.effect === "dark")
        {
          this.goodsInfo.goodsLabel.push(obj.label)
        }else
          this.goodsInfo.goodsLabel.splice(this.goodsInfo.goodsLabel.indexOf(obj.label),1)
      }
    },

  }
</script>

<style scoped lang="scss">
  *{
    *border:1px solid red;
  }
  .add-goods-container{
    background: #ffffff;
    width: 100%;

    height: 1500px;
    position: relative;
    border-radius: 0 0 10px 10px;
    .form,.el-form{
      width: 500px;
      height: 100%;
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
  .add-goods-container{
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
        width: auto;
        textarea{
          width: 300px;
        }
        .el-input__inner:not(textarea){
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
