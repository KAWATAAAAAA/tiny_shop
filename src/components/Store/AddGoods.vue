<template>
    <div class="add-goods-container">
      <el-form :model="goodsInfo" :rules="rules" ref="goodsInfo" :class="{form:true}" status-icon class="demo-ruleForm" label-width="100px">
        <el-form-item label="预览图 :">
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
        <el-form-item label=" " prop="accept">
          <el-checkbox-group v-model="goodsInfo.accept">
            <el-checkbox label="我已阅读" name="accept">我已阅读<router-link to="">《平台上架商品须知》</router-link></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submitForm('goodsInfo')">立即保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import Api from '../../api'
  import TagsEdit from './TagsEdit'
  export default {
    name: 'AddGoods',
    components:{
      TagsEdit
    },
    data () {
      let valiGoodsName = (rule, value, callback) => {
        setTimeout(() => {
          if (value.length < 1) {
            console.log('err')
            callback(new Error('请输入至少一位字符作为名称'));
          }
          else
            callback();
        }, 1000);
      };
      let valiGoodsPrice = (rule, value, callback) => {
        setTimeout( ()=>{
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
          else
            callback()
        },1000)
      };
      let valiGoodsNum = (rule, value, callback) => {
        setTimeout( ()=>{
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
          else
            callback()
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
        goodsInfo:{
          goodsPreviewImg:"",
          goodsName:"",
          goodsPrice:"",
          goodsNum:"",
          goodsLabel:[],
          storeId:this.$route.params.id,
          accept:""
        },
        rules:{
          goodsName: [
            { validator: valiGoodsName, trigger: 'blur' }
          ],
          goodsPrice: [
            { validator: valiGoodsPrice, trigger: 'blur' }
          ],
          goodsNum: [
            { validator: valiGoodsNum, trigger: 'blur' }
          ],
          accept: [
            { validator: valiAccept, trigger: 'blur' }
          ]
        },
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
          if (valid) {
            console.log(this.goodsInfo)
            Api.setGoodsInfo(this.goodsInfo).then( res=>{
              if (res.code === 200){
                //this.$router.push({name:'MyGoodsList'})
                this.$message({
                  type:'success',
                  message:res.data
                })
                this.$refs[formName].resetFields() //清除表单信息
                this.imageUrl = "" //清除图片
                this.dynamicTags.splice(5)
              }
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
