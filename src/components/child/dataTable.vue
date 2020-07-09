
<style scoped>
.content {
  margin-top: 20px;
}

.x-dataTable-col {
  padding: 5px 10px;
}

.x-dataTable-info {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  height: 100%;
  border-radius: 8px;
  font-size: 32px;
  font-weight: bold;
}

.line-chart {
  background-color: #ffffff;
  border-radius: 8px;
}
</style>

<template>
  <div class="content">
    <!-- <div id="main" style="width: 700px;height:1200px;"></div> -->
    <el-row class="x-dataTable-row" type="flex" justify="space-around">
      <el-col :span="8" class="x-dataTable-col">
        <div class="x-dataTable-info">
          101宿舍用电实时数据
        </div>
      </el-col>
      <el-col :span="8" class="x-dataTable-col">
        <ve-line
          class="line-chart"
          width="100%"
          height="300px"
          :data="chartData"
          :settings="chartSettings1"
          :extend="chartsExtend"
        ></ve-line>
      </el-col>
      <el-col :span="8" class="x-dataTable-col">
        <ve-line
          class="line-chart"
          width="100%"
          height="300px"
          :data="chartData"
          :settings="chartSettings2"
          :extend="chartsExtend"
        ></ve-line>
      </el-col>
    </el-row>
    <el-row class="x-dataTable-row" type="flex" justify="space-around">
      <el-col :span="8" class="x-dataTable-col">
        <ve-line
          class="line-chart"
          width="100%"
          height="300px"
          :data="chartData"
          :settings="chartSettings3"
          :extend="chartsExtend"
        ></ve-line>
      </el-col>
      <el-col :span="8" class="x-dataTable-col">
        <ve-line
          class="line-chart"
          width="100%"
          height="300px"
          :data="chartData"
          :settings="chartSettings4"
          :extend="chartsExtend"
        ></ve-line>
      </el-col>
      <el-col :span="8" class="x-dataTable-col">
        <ve-line
          class="line-chart"
          width="100%"
          height="300px"
          :data="chartData"
          :settings="chartSettings5"
          :extend="chartsExtend"
        ></ve-line>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 以饼图为例
// 其他种类图表配置项参见百度echarts官网
export default {
  data() {
    this.chartsExtend = {
      legend: {
        top: 20
      },
      grid: {
        top: 70,
        left: 25,
        right: 32,
        bottom: 30
      }
    };
    this.chartSettings1 = {
      metrics: ["电压"]
    };
    this.chartSettings2 = {
      metrics: ["电流"]
    };
    this.chartSettings3 = {
      metrics: ["功率"]
    };
    this.chartSettings4 = {
      metrics: ["电能"]
    };
    this.chartSettings5 = {
      metrics: ["温度"]
    };
    return {
      chartData: {
        columns: ["日期", "电压", "电流", '功率', '电能', '温度'],
        rows: [
          { 日期: "1/1", "电压": 93, "电流": 0.53, "功率": 0.32, "电能": 1300, "温度": 35 },
          { 日期: "1/2", "电压": 30, "电流": 0.53, "功率": 0.26, "电能": 100, "温度": 25 },
          { 日期: "1/3", "电压": 23, "电流": 0.53, "功率": 0.76, "电能": 180, "温度": 15 },
          { 日期: "1/4", "电压": 23, "电流": 0.53, "功率": 0.49, "电能": 1000, "温度": 5 },
          { 日期: "1/5", "电压": 92, "电流": 0.53, "功率": 0.32, "电能": 1900, "温度": 30 },
          { 日期: "1/6", "电压": 93, "电流": 0.53, "功率": 0.77, "电能": 130, "温度": 21 }
        ]
      }
    };
  }
};
</script>
