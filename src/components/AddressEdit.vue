<template>
  <div class="address-edit-wrapper">
    地址编辑
    <el-form ref="ruleForm" :model="ruleForm" label-width="6rem" class="form-area">
      <el-form-item label="收货人" prop="userRealName">
        <el-input v-model="ruleForm.userRealName"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhoneNum">
        <el-input v-model="ruleForm.userPhoneNum"></el-input>
      </el-form-item>
      <el-form-item label="所在地区" prop="areaAddress">
        <el-cascader
          placeholder="试试搜索：长沙市"
          :options="options"
          class="address-area"
          v-model="ruleForm.areaAddress"
          @change="handleChange"
          filterable>

        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailAddress">
        <el-input type="textarea" v-model="ruleForm.detailAddress" class="detail-address"></el-input>
      </el-form-item>
      <el-form-item label="设为默认地址" prop="isDefault">
        <el-switch v-model="ruleForm.isDefault"></el-switch>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import _ from 'lodash'
  import {regionData,CodeToText} from 'element-china-area-data'
  import {mapState} from 'vuex'
  import Api from '../api'
  import LS from '../static/js/LogStyle'
  export default {
    name: 'AddressEdit',
    data(){
      return {
        ruleForm:{
          userRealName:"",
          userPhoneNum:"",
          areaAddress:"",
          detailAddress:"",
          isDefault:true
        },
        options:regionData
      }
    },
    computed:{
      ...mapState('userInfo',['user'])
    },
    mounted () {
      console.log(" %c Edit 已经被加载",LS.lightRed)
      let data = {
        addressId:this.$route.params.id
      }
      console.log(data)
      Api.getAddressItem(data).then(res=>{
        console.log(res)
        if (res && res.code === 200){
          this.ruleForm = res.data
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      handleChange(value){
        let text = ""
        for(let index in value){
          text += CodeToText[value[index]]
        }

        this.ruleForm.detailAddress = text
      },
      async submitForm(formName){
        let data = _.cloneDeep(this.ruleForm)
        data.userId = this.user.userId
        let res = await Api.updateAddressItem(data)
        if(res && res.code === 200)
        {
          console.log(res)
          this.$message({
            type:'success',
            message:res.message
          })
          this.$router.go(-1)
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">

.address-edit-wrapper{
  padding: 2rem;
  background: #FFffff;
  width: 100%;

  .form-area{
    width: 800px;
    .el-form-item{
      width: 400px;
      display: flex;
    }
    .address-area{
      width: 300px;
    }

  }
}

</style>
<style lang="scss">
  .address-edit-wrapper{
    .el-form-item__content{
      margin: 0 !important;
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .detail-address{
      textarea{
        min-height: 120px !important;
        height: 120px !important;
      }
    }
  }
</style>
