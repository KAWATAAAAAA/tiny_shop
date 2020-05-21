<template>
  <div class="address-confirm-wrapper">
    <el-divider content-position="left">收货地址列表（点击改变默认地址）</el-divider>
    <div class="address-infos">
      <div class="address-item" v-for="(item,index) in addressArr" :key="index" @click="handleSelect(index)">
        <span class="custom-input-container">
          <span :class="[{'assist-common':!item.isDefault},{'assist-sty-action':item.isDefault}]"></span>
          <input type="radio" v-model="item.isDefault" :value="item.isDefault" name="isDefault" @click="handleChange($event,index)" />
          <span class="address-text">{{`${item.detailAddress} (${item.userRealName} 收) ${item.userPhoneNum} `}}</span>
          <el-button type="danger" icon="el-icon-edit" size="mini" @click="handleEditAddress($event,index)">编辑</el-button>
          <span v-if="item.isDefault" class="normal-address-text" >默认地址</span>

        </span>
      </div>
      <div class="new-address-wrapper">
        <el-link type="primary" @click="toAddNewAddressItem">新增地址</el-link>
      </div>
    </div>
    <div class="address-placeholder" v-if="addressArr.length === 0">收货地址列表为空，快去<router-link :to="{name:'AddressEdit'}">添加</router-link></div>
  </div>
</template>

<script>

  import Api from '../../api'
  import { mapState } from 'vuex'

  export default {
    name: 'AddressInfo',

    data(){
      return {
        isDefault:false,
        addressArr:[],
        radioArr:[]
      }
    },
    computed:{
      isEditDisplay:()=> this.addressArr.length === 0?false:true,
      ...mapState('userInfo',['user'])
    },
    async mounted () {
      // API
      console.log("该组件不需要缓存 需要重新加载")
      let res = await Api.getAddressList()
      if(res && res.code === 200){
        this.addressArr = res.data
        console.log(res)
      }
      else{
        console.log(res)
      }

    },
    methods:{
      handleChange(event,index){
        event.stopPropagation()
        let point = this.addressArr
        for(let i in point)
        {
          point[i].isDefault = false
        }
        if (!(this.addressArr[index].isDefault))
          this.addressArr[index].isDefault = !(this.addressArr[index].isDefault)

        console.log(index)
      },
      handleSelect(index){

        let nodelist = document.querySelectorAll(".address-item [type='radio']")
        //let nodelist = document.querySelectorAll(".address-item .el-radio__input")
        //let nodelist = document.querySelectorAll(".address-item .el-radio")
        //let nodelist = document.querySelectorAll(".address-item .el-radio__inner")

        this.radioArr = [...nodelist]
        this.radioArr[index].checked = true
        // 创建事件对象
        let newEvent = document.createEvent('HTMLEvents');
        newEvent.initEvent('click', false,false);
        // 事件分发！！！代替手动点击
        this.radioArr[index].dispatchEvent(newEvent)

      },
      handleEditAddress(event,index){
        event.stopPropagation()
        let addressId = this.addressArr[index].addressId
        this.$router.push({
          path:`address/edit/${addressId}`,
        })
      },
      toAddNewAddressItem(){
        this.$router.push({
          name:'AddAddress'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.address-confirm-wrapper{
  min-height: calc(100vh - 45px - 10px - 260px - 10px);
  background: #FFffff;
  position: relative;
  padding: 2rem;
  .address-placeholder{
    position:absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
  }
  .address-infos{

    text-align: left;
  }
  .address-item{
    width: 100%;
    padding:1rem 1rem;
    text-indent: 1rem;
    &:hover{
      cursor: pointer;
      border-bottom: 1px dashed #FF4400;
      border-top: 1px dashed #FF4400;
    }
    .custom-input-container{

      position: relative;
      padding-left: 2rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      input{
        width: 1rem;
        height: 1rem;
        position:absolute;
        left:0;
        top:50%;
        transform: translateY(-50%);
        z-index: -1;
      }
      .assist-common{
        width: 1rem;
        height: 1rem;
        position:absolute;
        left:0;
        top:50%;
        transform: translateY(-50%);
        z-index: 2;
        border-radius: 50%;
        border:1px solid #dcdfe6;
      }
      .assist-sty-action{
        width: 1rem;
        height: 1rem;
        position:absolute;
        left:0;
        top:50%;
        transform: translateY(-50%);
        z-index: 2;
        border-radius: 50%;
        border: none !important;

        background: #FF4400;

        &::before{
          content: '';
          width: .4rem;
          height: .4rem;
          position:absolute;
          left:50%;
          top:50%;
          transform:translateX(-50%) translateY(-50%);
          border-radius: 50%;
          background: #ffffff;
        }
      }
      .normal-address-text{
        position:absolute;
        right: 10rem;
        top:50%;
        transform: translateY(-50%);

      }

      .el-button{
        margin-left: 2rem;
      }
    }
  }
  .new-address-wrapper{
    padding-left: 1rem;
    margin-top: 2rem;
    .el-link--inner{
      margin-left: 4rem;
    }
  }
}
</style>
<style lang="scss">
  .address-item{
    label{
      margin-right: 1rem !important;
    }
    .el-radio__label{
      display: none !important;
    }
  }
</style>
