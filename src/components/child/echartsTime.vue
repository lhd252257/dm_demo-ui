
<style scoped>
.content {
  display: flex;
  justify-content: center;
}
#main {
height: 400px;
}
</style>
<template>
<div class="content">
  <div id="main"  style="width: 600px;height:400px;"></div>
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
      // 初始化空对象
      chart: null,
      // 初始化图表配置
      opinion: ['归宿异常人员', '长时间滞留宿舍', '黑名单人员出现', '学生家属访客', '校内职工访客'],
      opinionData: [{
        value: 26,
        name: '归宿异常人员'
      }, {
        value: 31,
        name: '长时间滞留宿舍'
      }, {
        value: 18,
        name: '黑名单人员出现'
      }, {
        value: 28,
        name: '学生家属访客'
      }, {
        value: 21,
        name: '校内职工访客'
      }]
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
        title: {
          text: '校园当日信息统计',
          subtext: '2020.7.2',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: this.opinion // 别忘了this
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['pie']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        series: [{
          name: '种类',
          type: 'pie',
          // 内圆半径，外圆半径
          radius: [30, 100],
          // 位置，左右，上下
          center: ['50%', '50%'],
          roseType: 'area',
          data: this.opinionData // 别忘了this
        }]
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
