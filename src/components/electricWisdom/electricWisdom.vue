<template>
<div>
    <div>
      <el-table
            :data="tableData"
            style="width: 100%"
           >
            <el-table-column
            prop="home_number"
            label="宿舍楼"
            width="180">
            </el-table-column>

            <el-table-column
            prop="room_number"
            label="宿舍号"
            width="180">
            </el-table-column>

            <el-table-column
            prop="room_device_status"
            label="宿舍设备状态">
              <template slot-scope="scope">
                <el-tag :type="tag_type[scope.row.room_device_status]">{{scope.row.room_device_status}}</el-tag>
              </template>
            </el-table-column>

            <el-table-column
            prop="room_device_police"
            label="设备报警状态(点击按钮可查看)">
               <template slot-scope="scope">
                <el-button :type="tag_type[scope.row.room_device_police]" @click="show_alarm_data(scope.row)">{{scope.row.room_device_police}}</el-button>
              </template>
            </el-table-column>

            <el-table-column
            prop="show_device_data"
            label="渲染宿舍实时数据">
            </el-table-column>
      </el-table>
    </div>
    <div>
      <vue-dataTable></vue-dataTable>
    </div>
    <div>
      <el-dialog
                title="宿舍报警数据"
                :visible.sync="editDialogVisible"
                width="50%"
                >
                <el-table
                  :data="room_alarm_data"
                  style="width: 100%">

                  <el-table-column
                    prop="time"
                    label="发生时间"
                    width="180">
                  </el-table-column>

                  <el-table-column
                    prop="event_type"
                    label="事件类型"
                    width="180">
                  </el-table-column>

                  <el-table-column
                    prop="event_message"
                    label="事件记录">
                  </el-table-column>
                </el-table>

        </el-dialog>
    </div>
</div>
</template>
<style lang="less" scoped>
</style>
<script>
import DataTable from '../child/dataTable'
export default {
  methods: {
    show_alarm_data (row) {
      if (row.room_device_police === '正常') { this.room_alarm_data = null } else { this.room_alarm_data = this.room_alarm_data2 }
      this.editDialogVisible = true
    }
  },
  data () {
    return {
      tableData: [{
        home_number: '101宿舍',
        room_number: '3306',
        room_device_status: '在线',
        room_device_police: '报警',
        show_device_data: '点击查看当前宿舍设备状态'
      }, {
        home_number: '102宿舍',
        room_number: '3307',
        room_device_status: '离线',
        room_device_police: '正常',
        show_device_data: '点击查看当前宿舍设备状态'
      }, {
        home_number: '103宿舍',
        room_number: '3308',
        room_device_status: '在线',
        room_device_police: '正常',
        show_device_data: '点击查看当前宿舍设备状态'
      }, {
        home_number: '104宿舍',
        room_number: '3309',
        room_device_status: '离线',
        room_device_police: '正常',
        show_device_data: '查看宿舍用电数据'
      }],
      tag_type: {
        报警: 'danger',
        正常: 'success',
        在线: 'warning',
        离线: 'info'
      },
      editDialogVisible: false,
      room_alarm_data: [
        { time: '2020-07-07', event_type: '预警', event_message: '电压过压' },
        { time: '2020-07-07', event_type: '故障', event_message: '温度故障' },
        { time: '2020-07-07', event_type: '预警', event_message: '电流过流' },
        { time: '2020-07-07', event_type: '预警', event_message: '电压欠压' }
      ],
      room_alarm_data2: [
        { time: '2020-07-07', event_type: '预警', event_message: '电压过压' },
        { time: '2020-07-07', event_type: '故障', event_message: '温度故障' },
        { time: '2020-07-07', event_type: '预警', event_message: '电流过流' },
        { time: '2020-07-07', event_type: '预警', event_message: '电压欠压' }
      ]
    }
  },
  components: {
    'vue-dataTable': DataTable
  }
}
</script>
