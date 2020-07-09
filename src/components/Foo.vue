<template>
    <div class="foo-container">
       <el-button @click="resetDateFilter">清除寝室筛选条件</el-button>
       <el-button @click="clearFilter">清除所有筛选条件</el-button>
       <el-button @click="roomFilter">清除寝室状态控制器</el-button>
       <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="homeNumber"
            label="宿舍楼"
            width="180"
            column-key="homeNumber"
            :filters="[{text: '1号宿舍楼', value: '1号宿舍楼'}, {text: '2号宿舍楼', value: '2号宿舍楼'}, {text: '3号宿舍楼', value: '3号宿舍楼'}, {text: '4号宿舍楼', value: '4号宿舍楼'}]"
            :filter-method="filterHandler"
            >
            <template slot-scope="scope">
                <el-tag>{{scope.row.homeNumber}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column
            prop="roomNumber"
            label="寝室号"
            width="180">
            </el-table-column>

            <el-table-column
            prop="studentCount"
            label="在寝人员数量">
            </el-table-column>

            <el-table-column
            prop="state"
            label="寝室异常状态"
            width="200"
            column-key="state"
            :filters="[{ text: '归宿异常', value: '归宿异常' }, { text: '滞留异常', value: '滞留异常' }, { text: '满勤', value: '满勤' }, { text: '全员离宿', value: '全员离宿' }]"
            :filter-method="filterTag">
            <template slot-scope="scope">
                <el-tag>{{scope.row.state}}</el-tag>
            </template>
            </el-table-column>
            <el-table-column  type="expand">
                <template slot-scope="scope">
                     <el-table
                      ref="expandTable"
                     :data="scope.row.childer">
                         <el-table-column
                           prop="roomNumber"
                           label="寝室号">
                         </el-table-column>
                         <el-table-column
                           prop="studentName"
                           label="学生姓名">
                         </el-table-column>
                          <el-table-column
                           prop="studentNumber"
                           label="学号">
                         </el-table-column>
                          <el-table-column
                           prop="endTime"
                           label="归宿时间">
                         </el-table-column>
                          <el-table-column
                           prop="startTime"
                           label="离宿时间">
                         </el-table-column>
                          <el-table-column
                           prop="state"
                           label="就寝状态">
                            <template slot-scope="scope">
                                <el-tag>{{scope.row.state}}</el-tag>
                            </template>
                         </el-table-column>
                           <el-table-column
                           prop="mobile"
                           label="手机号">
                         </el-table-column>
                     </el-table>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                :current-page="currentPage4"
                :page-sizes="[15, 20, 25, 30]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="200">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        homeNumber: '1号宿舍楼',
        roomNumber: '101宿舍',
        studentCount: '2',
        state: '滞留异常',
        childer: [{
          roomNumber: '101宿舍',
          studentName: '这屋一号床上铺',
          studentNumber: '1011',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '滞留',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '101宿舍',
          studentName: '这屋一号床下铺',
          studentNumber: '1012',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '滞留',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '101宿舍',
          studentName: '这屋二号床上铺',
          studentNumber: '1013',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '101宿舍',
          studentName: '这屋二号床下铺',
          studentNumber: '1014',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '离宿',
          mobile: '137xxxx5566'
        }]
      }, {
        homeNumber: '2号宿舍楼',
        roomNumber: '102宿舍',
        studentCount: '3',
        state: '归宿异常',
        childer: [{
          roomNumber: '102宿舍',
          studentName: '这屋一号床上铺',
          studentNumber: '1011',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '102宿舍',
          studentName: '这屋一号床下铺',
          studentNumber: '1012',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '102宿舍',
          studentName: '这屋二号床上铺',
          studentNumber: '1013',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '未归',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '102宿舍',
          studentName: '这屋二号床下铺',
          studentNumber: '1014',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '未归',
          mobile: '137xxxx5566'
        }]
      }, {
        homeNumber: '3号宿舍楼',
        roomNumber: '103宿舍',
        studentCount: '1',
        state: '全员离宿',
        childer: [{
          roomNumber: '103宿舍',
          studentName: '这屋一号床上铺',
          studentNumber: '1011',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '没在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '103宿舍',
          studentName: '这屋一号床下铺',
          studentNumber: '1012',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '没在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '103宿舍',
          studentName: '这屋二号床上铺',
          studentNumber: '1013',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '没在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '103宿舍',
          studentName: '这屋二号床下铺',
          studentNumber: '1014',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '没在宿舍',
          mobile: '137xxxx5566'
        }]
      }, {
        homeNumber: '4号宿舍楼',
        roomNumber: '104宿舍',
        studentCount: '4',
        state: '归宿异常',
        childer: [{
          roomNumber: '104宿舍',
          studentName: '这屋一号床上铺',
          studentNumber: '1011',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '104宿舍',
          studentName: '这屋一号床下铺',
          studentNumber: '1012',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '104宿舍',
          studentName: '这屋二号床上铺',
          studentNumber: '1013',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '未归',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '104宿舍',
          studentName: '这屋二号床下铺',
          studentNumber: '1014',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        }]
      }, {
        homeNumber: '4号宿舍楼',
        roomNumber: '101宿舍',
        studentCount: '4',
        state: '全员离宿',
        childer: [{
          roomNumber: '101宿舍',
          studentName: '这屋一号床上铺',
          studentNumber: '1011',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '离宿',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '101宿舍',
          studentName: '这屋一号床下铺',
          studentNumber: '1012',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '离宿',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '101宿舍',
          studentName: '这屋二号床上铺',
          studentNumber: '1013',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '离宿',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '101宿舍',
          studentName: '这屋二号床下铺',
          studentNumber: '1014',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '离宿',
          mobile: '137xxxx5566'
        }]
      }, {
        homeNumber: '4号宿舍楼',
        roomNumber: '102宿舍',
        studentCount: '4',
        state: '满勤',
        childer: [{
          roomNumber: '102宿舍',
          studentName: '这屋一号床上铺',
          studentNumber: '1011',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '102宿舍',
          studentName: '这屋一号床下铺',
          studentNumber: '1012',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '102宿舍',
          studentName: '这屋二号床上铺',
          studentNumber: '1013',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        },
        {
          roomNumber: '102宿舍',
          studentName: '这屋二号床下铺',
          studentNumber: '1014',
          endTime: '2020-7-4 20:11:05',
          startTime: '2020-7-4 20:11:05',
          state: '在宿舍',
          mobile: '137xxxx5566'
        }]
      }]
    }
  },
  methods: {
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('homeNumber')
    },
    roomFilter () {
      this.$refs.filterTable.clearFilter('state')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      console.log(column)
      return row.address
    },
    filterTag (value, row) {
      console.log(value)
      return row.state === value
    },
    filterHandler (value, row) {
      return row.homeNumber === value
    }
  }
}
</script>
<style lang="less" scoped>
  .foo-container {
    height: 100%;
  }
</style>
