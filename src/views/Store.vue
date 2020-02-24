<template>
    <div class="store-container">
      <div class="store-h">
        <StoreInfo />
      </div>
      <div class="store-body">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import StoreInfo from '../components/Store/StoreInfo'
  export default {
    name: 'Store',
    components:{
      StoreInfo
    }
  }
</script>

<style scoped lang="scss">
  *{
    *border:1px solid red;
  }
.store-container{

  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .store-h{
    width: 1120px;
    height: auto;
    background: #ffffff;
    padding: 2rem;
    padding-bottom: 0;
  }
  .store-body{
    margin-top: 10px;
    width: 1120px;
    height: auto;
    background: #ffffff;
    padding:.5rem 2rem;
  }

  @media (min-width: 1420px) {
     .store-h,.store-body{
      width: 1280px !important;
    }
  }
}
</style>
