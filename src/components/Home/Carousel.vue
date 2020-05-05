<template>
  <div id="carousel-area">
    <el-carousel indicator-position="outside" class="loop-wrapper">
      <el-carousel-item v-for="(item,index) in images" :key="index" class="loop-item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'Carousel',
    data(){
      return{
        images:[

          require("../../assets/images/loop1.png"),
          require("../../assets/images/loop2.png"),
        ]
      }
    },
  }
</script>

<style lang="scss">

  #carousel-area{
    width: 100% !important;

    background: #fbfcfc;
    position: relative;
    .loop-wrapper{
      width: 100%;
      height: 100%;

      .el-carousel__container{
        width: 100%;
        height: 465px;

      }
    }
    ul{
      position:absolute;
      left:50%;
      bottom:0;
      transform:translateX(-50%);
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .loop-item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
