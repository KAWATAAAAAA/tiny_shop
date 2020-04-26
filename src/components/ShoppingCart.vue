<template>
    <div class="cart-container">
      <div class="cart-header">
        <section class="compon-name"> </section>
        <button class="goods-manager">管理</button>
      </div>
      <div class="cart-main-area">
        <div class="store-division" v-for="(store,index) in storeInfo" :key="index">
          <div class="g-store">
            <el-checkbox size="mini" v-model="store.checked" @change="handleStoreSelect(store)" style="margin-right: .5rem"> </el-checkbox>
            {{store.storeName}}
            <i class="el-icon-arrow-right" style="margin-left: 2rem" />
          </div>
          <div class="cart-item" v-for="(item,index) in store.goodsInfo" :key="index">

            <div class="g-item-body">
              <div class="checked-box">
                <el-checkbox  v-model="item.checked"></el-checkbox>
              </div>
              <div class="cart-item-left">
                <div class="g-preview" :style="`background-image: url(${item.goodsPreviewImg})`">
                  <!--img :src="item.goodsPreviewImg"-->

                </div>
              </div>
              <div class="cart-item-right">
                <div class="c-i-r-top">
                  <div class="g-name">
                    {{item.goodsName}}
                  </div>
                </div>
                <div class="c-i-r-bottom">
                  <div class="g-price">{{item.goodsPrice}}</div>
                  <div class="g-num">
                    <button class="n-minus" @click="reduceGoodsNum(item)">-</button>
                    <input v-model="item.num"/>
                    <button class="n-plus" @click="addGoodsNum(item)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="storeInfo.length === 0" class="cart-placeholder">
          购物袋里空空如也！快去逛逛吧。
        </div>
      </div>


      <div class="cart-footer">
        <el-checkbox  label="1" size="mini" v-model="isSelectAll" @change="selectAll" class="selectAll">全选</el-checkbox>
        <span class="total-price">
          合计: {{totalPriceGetter}}
        </span>
        <el-button class="settle" :disabled="beCheckedArrGetter.length === 0" @click="handleSettle">
          结算
        </el-button>
      </div>
      <i class="el-icon-arrow-right cls-btn" @click="showCart"/>
    </div>
</template>

<script>

  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import {DECRE_GOODS_NUM,INCRE_GOODS_NUM} from '../store/modules/mutation-types'
  import Api from '../api'
  export default {
    name: 'ShoppingCart',
    data(){
      return{
        isSelectAll:false,

        isUserLive:{}  // false 离线, true在线
      }
    },
    watch:{
      'isUserLive.status'(newvalue){
        if (newvalue === true)
        {
          console.log("发生了改变",newvalue)
          this.setCartState()
        }
      }
    },
    mounted () {
      console.log("购物车组件加载完毕")
      /*
      * 将内容转至 vue actions
      * */
      this.isUserLive = this.getUserInfo
      //this.setCartState()
    },

    computed:{
      ...mapState('commonState',['isCartOpen']),
      ...mapState('userInfo',['user']),
      ...mapState('cartState',['storeInfo','totalPrice']),
      ...mapGetters('cartState',['totalPriceGetter','beCheckedArrGetter']),
      ...mapGetters('userInfo',['getUserInfo']),

    },
    methods:{
      ...mapActions('commonState',['showCart']),
      ...mapActions('cartState',['setStoreChecked','setAllStoreChecked','setCartState']),
      ...mapMutations('cartState',[DECRE_GOODS_NUM,INCRE_GOODS_NUM]),
      reduceGoodsNum(item){
        let data = {
          userId:this.user.userId,
          goodsId:item.goodsId,
          isDecrement:true
        }
        Api.updateShoppingCartGoodsInfo(data).then((res)=>{
          console.log(res)
          this[DECRE_GOODS_NUM](item)
        }).catch((err)=>{
          console.log(err)
        })

      },
      addGoodsNum(item){

        let data = {
          userId:this.user.userId,
          goodsId:item.goodsId,
          isDecrement:false
        }
        Api.updateShoppingCartGoodsInfo(data).then((res)=>{
          console.log(res)
          this[INCRE_GOODS_NUM](item)
        }).catch((err)=>{
          console.log(err)
        })
      },
      handleStoreSelect(store){
        this.setStoreChecked(store)
      },
      handleSettle(){
        this.$router.push({
          name:'BuyNowConfirm',
          params:{fromCart:true}
        })
        this.showCart()
      },
      selectAll(){
        this.storeInfo.forEach((item)=>{
          this.setAllStoreChecked(item)
        })
      },

    }
  }
</script>

<style scoped lang="scss">


.cart-container{

  width:380px;
  height:100vh;
  border-radius: 5px 0 0 5px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background: #eaeaea;
  transition: all .5s cubic-bezier(.22,.5,.16,1.66);

  box-shadow: 0 0 15px -10px rgba(0,0,0,.6), 1px 1px 15px -10px rgba(0,0,0,.5)
;
  &::before{
    content: '';
    width: 60px;
    height: 60px;
    background: #ffffff;
    position:absolute;
    left:0;
    top:50%;
    z-index: 0;
    transform:translateX(-30%) translateY(-50%) rotate(90deg);
    -webkit-clip-path: polygon(100% 0,80% 100%, 20% 100%, 0 0)

  }
  &::after{
    content: '';
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.5);
    position: absolute;
    left: -100vw;
    top: 0;
    z-index: -1;
  }
  .cls-btn{
    cursor: pointer;
    position:absolute;
    left:0;
    top:50%;
    transform:translateX(-100%) translateY(-50%);
    z-index: 1;
    height: 64px;
    line-height: 64px;
  }
  .cart-header{
    background: #ffffff;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem;
    height: 50px;
    .compon-name{
      font-weight: bold;
    }
    .goods-manager{
      padding: .2rem 1rem;
      background:#03a9f4;
      outline: none;
      border: none;
      color: #ffffff;
      border-radius: 5px;
    }
  }
  .cart-main-area{
    height: calc(100% - 110px);
    overflow-y: auto;
    position: relative;
    .cart-placeholder{
      width: 100%;
      font-weight: bold;
      position:absolute;
      left:50%;
      top:50%;
      transform:translateX(-50%) translateY(-50%);
    }
    .store-division{
      margin-bottom: 10px;
      border-radius: 5px;
      background: #ffffff;
      .g-store{

        border-bottom: 1px solid #eaeaea;
        width: 100%;
        padding: .5rem 1rem;
        font-size: .8rem;
        text-align: left;

        i{
          transition: all .5s ease;
        }
        &:hover i{
          transform: translateX(1rem);
        }
      }
      .cart-item{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        background: #ffffff;
        height: 120px;
        .g-item-body{
          width: 100%;
          height: calc(100% - 20px);

          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          .checked-box{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 1rem;
          }
          .cart-item-left{
            .g-preview{
              width: 100px;
              height: 100px;
              background-repeat: no-repeat;
              background-size: 115%;
              background-position: center;
              padding: .5rem;
              background-origin: content-box;

            }
          }

          .cart-item-right{
            height: 100%;
            flex-grow: 1;
            .c-i-r-top{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height: 50%;
              padding: 0 0.5rem;
              .g-name{
                width: 11rem;
                height: auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
              }
            }
            .c-i-r-bottom{
              height: 50%;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              padding:0 .5rem;
              justify-content: space-between;
              align-items: center;
              .g-price{
                font-weight: bold;
                color: #F40;
                position: relative;
                text-align: left;
                padding: .5rem 0;
                &::before{
                  content: '\00A5';
                  color: #F40;
                }
              }
              .g-num{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                flex-wrap: nowrap;
                border: 1px solid #eaeaea;
                border-radius: 3px;
                button{
                  width: 1.3rem;
                  padding: 0.2rem 0;
                  border: none;
                  outline: none;
                  background: transparent;
                  color: #999999;
                  &:hover{
                    cursor: pointer;
                  }
                }
                input{
                  width: 2rem;
                  padding: 0.2rem 0;
                  text-align: center;
                  outline: none;
                  border: none;
                  background: #ffffff;
                  border-left:1px solid #eaeaea;
                  border-right:1px solid #eaeaea;
                }
              }
            }
          }
        }




      }
    }
  }
  .cart-footer{
    background: #ffffff;
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;

    .total-price{
      font-size: .9rem;
    }
    .settle{
      padding: .5rem 1.5rem;
      border-radius: 3px;
      background: #F40;
      color:#ffffff;
      outline: none;
      border: none;
    }
  }



}
</style>
<style lang="scss">
  .cart-container{
    .selectAll{
      .el-checkbox__inner{
        border-radius: 50%;
      }
    }
  }
</style>
