<template>
    <div class="payment-completed-wrapper">
      <canvas id="canvas" :class="{canvas:canvasClass}">

      </canvas>
    </div>
</template>

<script>
  import Api from '../api'

  export default {
    name: 'PaymentCompleted',
    data(){
      return{
        canvasClass:false,
        canvas:"",
        ctx:"",
        ctxW:"",
        ctxH:"",
        lineWidth:"",
        centerX:"",
        centerY:"",

        r:"",
        sAngle:"",
        eAngle:"",
        xAngle:"",
        tmpAngle:"",
        orderInfo:{
          orderId:"",
          orderTotalPrice:""
        }
      }
    },
    mounted () {
      this.init()
      let reg = /out_trade_no=(\d*)(&|$)/
      let str = location.href
      this.orderInfo.orderId = str.match(reg)[1]

      reg = /total_amount=(\d*.\d*)(&|$)/
      console.log(str.match(reg))
      this.orderInfo.orderTotalPrice = str.match(reg)[1]
      this.sendRequest()
    },
    methods:{
      init(){
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.ctxW = this.canvas.width = 300  //画布的宽
        this.ctxH = this.canvas.height = 300 //画布的高

        this.lineWidth = 10 //圆周线框

        this.centerX = this.ctxW/2 // 圆中心点 x 坐标轴
        this.centerY = this.ctxH/2 // 圆中心点 y 坐标轴
        this.r = 100

        this.sAngle = -0.5 * Math.PI //起始角度
        this.eAngle = this.sAngle + 2 * Math.PI //结束角度
        this.xAngle =  5 * (Math.PI / 180); // 每次画 1 度，Math.PI/180 化为弧度制

        this.tmpAngle = this.sAngle // 临时角度，用于记录当前画到的度

        this.drawArc()
      },
      drawArc(){

        if (this.tmpAngle >= this.eAngle)
        {
          this.ctx.fillStyle = '#50dc47'
          this.ctx.fill()
          this.ctx.fillStyle = '#ffffff';
          this.ctx.font= 35 + 'px Microsoft Yahei';
          this.ctx.textAlign='center';
          this.ctx.fillText("支付完成",this.centerX,this.centerX,this.r + 35 / 2)
          this.canvasClass = true
          return
        }
        else if (this.tmpAngle + this.xAngle > this.eAngle)
          this.tmpAngle = this.eAngle
        else
          this.tmpAngle += this.xAngle

        this.ctx.clearRect(0,0,this.ctxW,this.ctxH)
        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = '#50dc47'
        this.ctx.arc(this.centerX,this.centerY,this.r,this.sAngle,this.tmpAngle)
        this.ctx.stroke()
        this.ctx.closePath()
//写字
        /*this.ctx.fillStyle = '#1d89d5';
        this.ctx.font= 35 + 'px Microsoft Yahei';
        this.ctx.textAlign='center';
        this.ctx.fillText( Math.round((this.tmpAngle -  this.sAngle) / (this.eAngle - this.sAngle) * 100) + '%', this.r, this.r , 35 / 2);*/
        requestAnimationFrame(this.drawArc)
      },
      sendRequest(){
        Api.updateOrderStatusPayCompleted(this.orderInfo).then(res=>{
          console.log(res)
        })

      }
    }
  }
</script>

<style scoped lang="scss">
.payment-completed-wrapper{
  display:block;
  font-weight: bold;
  font-size: 4rem;

  .canvas{
    animation: arcDance .5s ease 1;
  }
  @keyframes arcDance {
    from{
      transform: scale(1);
    }
    50%{
      transform: scale(0.9);
    }
    to{
      transform: scale(1.06);
    }
  }
}
</style>
