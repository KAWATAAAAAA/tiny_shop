<template>
  <div class="address-confirm-wrapper">
    <slot name="header"></slot>
    <div class="address-infos">
      <div class="address-item" v-for="(item,index) in addressArr" :key="index" @click="handleSelect(index)">
        <span class="custom-input-container">
          <span :class="[{'assist-common':index != activeIndex},{'assist-sty-action':index == activeIndex}]"></span>
          <input type="radio" name="detailAddress" @click="handleChange($event,index)" />
          {{`${item.detailAddress} (${item.userRealName} 收) ${item.userPhoneNum} `}} <i v-if="index == activeIndex" class="iconfont ext-icon-iconset0392" />
        </span>

      </div>
    </div>
    <div class="address-placeholder" v-if="addressArr.length === 0">收货地址列表为空，快去吧！<router-link :to="{name:'AddressEdit'}">添加</router-link></div>
  </div>
</template>

<script>

  import Api from '../../api'
  import { mapState } from 'vuex'

  export default {
    name: 'AddressInfo',

    data(){
      return {
        activeAddress:"",// 标识用户使用的是哪一个接收地址
        activeIndex:"", //标识选中高亮
        addressArr:[], //API 获取到的地址列表
        radioArr:[], //用于事件分发
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
        this.activeIndex = index
        this.activeAddress = this.addressArr[index].detailAddress
        console.log(index)
      },
      handleSelect(index){

        let nodelist = document.querySelectorAll(".address-item [type='radio']")
        //let nodelist = document.querySelectorAll(".address-item .el-radio__input")
        //let nodelist = document.querySelectorAll(".address-item .el-radio")
        //let nodelist = document.querySelectorAll(".address-item .el-radio__inner")

        this.radioArr = [...nodelist]
        this.radioArr[index].checked = 'checked'
        console.log(this.radioArr[index])
        // 创建事件对象
        let newEvent = document.createEvent('HTMLEvents');
        newEvent.initEvent('click', false,false);
        // 事件分发！！！代替手动点击
        this.radioArr[index].dispatchEvent(newEvent)

      }
    }
  }
</script>

<style scoped lang="scss">
.address-confirm-wrapper{
  min-height: 40%;
  background: #FFffff;
  *border:1px solid red;
  position: relative;
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
    width: 60%;
    padding:1rem 1rem;
    text-indent: 1rem;
    &:hover{
      cursor: pointer;
      /*box-shadow: 0  1px 18px -14px red,
      0 -1px 18px -14px red
    ;*/
      border-bottom: 1px dashed #FF4400;
      border-top: 1px dashed #FF4400;
    }
    .custom-input-container{

      position: relative;
      padding-left: 2rem;
      /*display: flex;
      justify-content: flex-start;
      align-items: center;*/

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
      .ext-icon-iconset0392{
        font-size: 1.5rem;
        position:absolute;
        right: -5rem;
        top:50%;
        transform:translateY(-50%);
      }
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
