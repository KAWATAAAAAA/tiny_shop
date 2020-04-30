<template>
  <div class="chart-view" id="chart-view">

  </div>
</template>

<script>
  import echarts from 'echarts'
  import Api from '../../api'
  export default {
      name: "DataCenterChartView",
      data(){
          return{
            chartLine:""
          }
      },
      async created () {
        let params = {
          storeId:this.$route.params.storeId
        }
        let res = await Api.getMonthSaleData(params)
        if(res && res.code === 200)
        {
          console.log(res)
        }
      },
      mounted() {
        this.initEcharts()
        this.$nextTick(() => {
          window.onresize = () => {
            this.chartLine.resize()
          }
        })
      },
      computed:{
          timeLine(){
            let arr = []
            let s = ""
            for(let i = 0 ;i < 24 ; i++)
            {
              if (i/10 < 1)
                s = `0${i}`
              else
                s = `${i}`
              arr.push(`${s}:00`)
            }
            return arr
          }
      },
      methods:{
        initEcharts(){
          let canvas = document.getElementById('chart-view')
          this.chartLine = echarts.init(canvas)
          let toolBox = {
            right:'6%',
            top:'5%',
            show:true,
            orient:'vertical', //垂直布局
            feature:{
              magicType:{
                type: ['line', 'bar'],
                show: true
              },
              saveAsImage: {
                show: true
              },
              dataView: {
                show: true
              },
              restore: {
                show: true
              },
            },


          }
          let option = {
            //设置tip提示
            tooltip: {
              trigger: 'axis',  //设置为坐标轴触发
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              },
            },

            //设置区分（哪条线属于什么）
            legend: {
              bottom: 30,
              left: '40%',
              data:['请求1','请求2'],  // 匹配 series 中的 name
            },
            // 与上面一一对应
            color: ['#8AE09F', '#FA6F53'],
            //设置x轴
            xAxis: {
              type: 'category', //数据为不连续的，多种数据的时候，为该类型时必须通过 data 设置类目数据
              data: this.timeLine, //
              name: '时间点',
              nameTextStyle:{
                color:'#03a9f4',
                fontWeight:'bold'
              },
              axisLabel: {
                interval:0,
              },
              axisTick:{
                alignWithLabel:true
              }
            },
            yAxis:{
              name: '销售量 / 总金额',
              type: 'value', // y 轴设置这个 自动根据
              nameTextStyle:{
                color:'#ff0000',
                fontWeight:'bold'
              },
              axisLine:{
                symbol:['none','arrow'],
                symbolOffset:[0, 8]//箭头距离两端的距离,可为负数
              },
            },
            series: [
              {
                name: '请求1',
                data:  [220, 232, 201, 234, 290, 230, 220],
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#8AE09F',
                  }
                }
              },
              {
                name: '请求2',
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#FA6F53',
                  }
                },
              }
            ],
            grid: {
              x:100,
              y:50,
              x2:130,
              y2:100
            },
            toolbox:{
              ...toolBox
            }

          }

          this.chartLine.setOption(option);
        },
      }
    }
</script>

<style scoped lang="scss">
.chart-view{
  width: 100%;
  height: 600px;
}
</style>
