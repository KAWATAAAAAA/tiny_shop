<template>
    <div class="content-container">
      <div class="content-left">
        <Carousel />
        <GoodsList />
      </div>
      <aside class="content-right">
        <HotGoods />
      </aside>
    </div>
</template>

<script>
  import Carousel from '../components/Home/Carousel'
  import GoodsList from '../components/Home/GoodsList'
  import HotGoods from '../components/Home/HotGoods'
  export default {
    name: 'Home',
    components: {
      Carousel,
      GoodsList,
      HotGoods
    }
  }
</script>

<style scoped lang="scss">
.content-container{
  width: 1200px;
  height: auto;
  padding: 0;

  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .content-left{
    width: 820px;
    height: auto;
  }
  .content-right{
    width: 360px;
    height: auto;
    background: white;
  }
}
</style>
