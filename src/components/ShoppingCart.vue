<template>
    <div class="cart-container" :class="{showCart:isCartOpen}">

    </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: 'ShoppingCart',
    data(){
      return{

      }
    },
    computed:{
      ...mapState('commonState',['isCartOpen'])
    }
  }
</script>

<style scoped>
  .showCart{
    border: 1px solid red;
    transform: translate3d(0,0,0) !important;
  }
.cart-container{
  background: white;
  width:300px;
  height: calc(100% - 90px - 20px);
  border-radius: 5px 0 0 5px;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999;
  transform: translate3d(100%,0,0);
  transition: transform .5s cubic-bezier(.22,.5,.16,1.66);
}
</style>
