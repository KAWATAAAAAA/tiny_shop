<template>
  <div id="carousel-area" class="carousel slide" data-ride="carousel">

    <!-- 指示符 -->
    <ul class="carousel-indicators">
      <li data-target="#carousel-area" data-slide-to="0" class="active"></li>
      <li data-target="#carousel-area" data-slide-to="1"></li>
      <li data-target="#carousel-area" data-slide-to="2"></li>
    </ul>

    <!-- 轮播图片 -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://static.runoob.com/images/mix/img_fjords_wide.jpg">
      </div>
      <div class="carousel-item">
        <img src="https://static.runoob.com/images/mix/img_nature_wide.jpg">
      </div>
      <div class="carousel-item">
        <img src="https://static.runoob.com/images/mix/img_mountains_wide.jpg">
      </div>
    </div>

    <!-- 左右切换按钮 -->
    <a class="carousel-control-prev" href="#carousel-area" data-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#carousel-area" data-slide="next">
      <span class="carousel-control-next-icon"></span>
    </a>

  </div>
</template>

<script>
  export default {
    name: 'Carousel'
  }
</script>

<style scoped lang="scss">

  .carousel{
    width: 100% !important;
    height: 380px !important;

    .carousel-inner,.carousel-item,img{
      width: 100% !important;
      height: 100% !important;
    }
  }

</style>
