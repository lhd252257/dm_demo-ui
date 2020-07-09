<template>
     <el-table
     class="x-blackList-container"
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <!-- 日期 -->
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180"
      column-key="date"
    >
    </el-table-column>

    <!-- 姓名 -->
    <el-table-column
      prop="studentnumber"
      label="人员编号"
      width="180">
    </el-table-column>

    <!-- 姓名 -->
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>

    <!-- 事件发生位置 -->
    <el-table-column
      prop="address"
      label="事件发生位置">
    </el-table-column>

    <!-- 标签 -->
    <el-table-column
      prop="tag"
      label="标签"
      :filters="[{ text: '校内职工', value: '校内职工' }, { text: '长时间滞留宿舍', value: '长时间滞留宿舍' },{ text: '归宿异常人员', value: '归宿异常人员' },{ text: '黑名单', value: '黑名单' },{ text: '学生家属', value: '学生家属' },]"
      :filter-method="filterTag">
      <template slot-scope="scope">
        <el-tag disable-transitions>
            {{scope.row.tag}}
        </el-tag>
      </template>
    </el-table-column>

  </el-table>
</template>
<style lang="less">
  .x-blackList-container {
    margin-top: 20px;
  }
</style>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小1',
        address: 'A1男宿舍楼',
        tag: '长时间滞留宿舍',
        studentnumber: '123456ESKCASDFA'
      }, {
        date: '2016-05-04',
        name: '王小2',
        address: 'A1女宿舍楼',
        tag: '校内职工',
        studentnumber: '123456ESKCASDFA'
      }, {
        date: '2016-05-01',
        name: '王小3',
        address: 'B1女宿舍楼',
        tag: '归宿异常人员',
        studentnumber: '123456ESKCASDFA'
      }, {
        date: '2016-05-03',
        name: '王小4',
        address: 'B1n男宿舍楼',
        tag: '黑名单',
        studentnumber: '123456ESKCASDFA'
      }, {
        date: '2016-05-03',
        name: '王小5',
        address: 'B1n22男宿舍楼',
        tag: '学生家属',
        studentnumber: '123456ESKCASDFA'
      }]
    }
  },
  methods: {
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      console.log(column)
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    }
  }
}
</script>
