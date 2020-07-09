
<style scoped>
.content{
  height: 2000px;
}
</style>

<template>
<div class="content">
  <div id="main" style="width: 800px;height:1200px;"></div>
</div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
// 以饼图为例
// 其他种类图表配置项参见百度echarts官网
export default {
  data () {
    return {
    }
  },
  methods: {
    // 绘图
    drawGraph (id) {
      // 绘图方法
      this.chart = echarts.init(document.getElementById(id))
      // 皮肤添加同一般使用方式
      this.chart.showLoading()
      // 返回到data中
      // eslint-disable-next-line no-unused-vars
      var that = this
      // set
      this.chart.setOption({
        // 图表上方的 统计
        legend: {},
        // 鼠标悬停在 折线上面的显示信息
        tooltip: {},
        dataset: [{
          source: [
            ['product', '电压'],
            ['2017.0701', '13'],
            ['2018', '13'],
            ['2019', '14'],
            ['2010', '15'],
            ['2011', '18'],
            ['2012', '20'],
            ['2013', '21'],
            ['2014', '22'],
            ['2015', '28']
          ]
        },
        {
          source: [
            ['product', '电流'],
            ['2017', '13'],
            ['2018', '13'],
            ['2019', '14'],
            ['2010', '15'],
            ['2011', '18'],
            ['2012', '20'],
            ['2013', '21'],
            ['2014', '22'],
            ['2015', '28']
          ]
        },
        {
          source: [
            ['product', '功率'],
            ['2017', '13'],
            ['2018', '13'],
            ['2019', '14'],
            ['2010', '15'],
            ['2011', '18'],
            ['2012', '20'],
            ['2013', '21'],
            ['2014', '22'],
            ['2015', '28']
          ]
        },
        {
          source: [
            ['product', '电能'],
            ['2017', '13'],
            ['2018', '13'],
            ['2019', '14'],
            ['2010', '15'],
            ['2011', '18'],
            ['2012', '20'],
            ['2013', '21'],
            ['2014', '22'],
            ['2015', '28']
          ]
        },
        {
          source: [
            ['product', '温度'],
            ['2017', '13'],
            ['2018', '13'],
            ['2019', '14'],
            ['2010', '15'],
            ['2011', '18'],
            ['2012', '20'],
            ['2013', '21'],
            ['2014', '22'],
            ['2015', '28']
          ]
        }
        ],
        title: {
          text: '101宿舍用电实时数据'
        },
        grid: [
          { x: '10%', y: '5%', width: '80%', height: '10%' },
          { x2: '10%', y2: '70%', width: '80%', height: '10%' },
          { x: '10%', y: '35%', width: '80%', height: '10%' },
          { x2: '10%', y2: '40%', width: '80%', height: '10%' },
          { x: '10%', y: '65%', width: '80%', height: '10%' }
        ],
        xAxis: [
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 },
          { type: 'category', gridIndex: 2 },
          { type: 'category', gridIndex: 3 },
          { type: 'category', gridIndex: 4 }
        ],
        yAxis: [
          { gridIndex: 0 },
          { gridIndex: 1 },
          { gridIndex: 2 },
          { gridIndex: 3 },
          { gridIndex: 4 }
        ],
        series: [
          { type: 'line' },
          { type: 'line', xAxisIndex: 1, yAxisIndex: 1, datasetIndex: 1 },
          { type: 'line', xAxisIndex: 2, yAxisIndex: 2, datasetIndex: 2 },
          { type: 'line', xAxisIndex: 3, yAxisIndex: 3, datasetIndex: 3 },
          { type: 'line', xAxisIndex: 4, yAxisIndex: 4, datasetIndex: 4 }
        ]
      })
      this.chart.hideLoading()
    }
  },
  // keypoint：执行方法
  // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
  mounted () {
    this.$nextTick(function () {
      this.drawGraph('main')
    })
  }
}
</script>
