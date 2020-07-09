<template>
  <div>
    <div>请搜索人员信息，进行权限管理</div>
    <!-- 搜索框区域 -->
    <div>
      <el-form :inline="true" ref="searchRef" class="formInline" :v-model="searchCondition">
        <el-form-item label="查询条件">
          <el-input
            class="formIput"
            v-model="searchCondition.cOne"
            placeholder="请直接输入要查询的学生信息，例如：张三 学号XXXX"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="SubmitCondition">查询</el-button>
          <el-button type="primary" @click="imageDistinguish">图片识别</el-button>
          <el-button type="primary" @click="addStudent">添加学生</el-button>
          <el-button type="primary" @click="outModel">导出模板</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改表格区域 -->
    <div>
      <el-table :data="personnelData" style="width: 100%">
        <!-- 表格各个列区域 -->
        <el-table-column label="姓名" prop="id"></el-table-column>
        <el-table-column label="工号" prop="job_number"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ genderEnum[scope.row.gender] }}
          </template>
        </el-table-column>
        <el-table-column label="宿舍号" prop="dept"></el-table-column>
        <el-table-column label="证件号" prop="id_card"></el-table-column>
        <el-table-column label="通行时间">
          <template slot-scope="scope">
            {{ formatDate(scope.row.passing_time[0]) }} - {{formatDate(scope.row.passing_time[1])}}
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="查看照片">
          <template slot-scope="scope">
            <!-- 查看照片按钮 -->
            <el-button
              type="primary"
              icon="el-icon-picture"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否拉黑">
          <template slot-scope="scope">
            {{ blackEnum[scope.row.is_blacklist] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="roleName" width="300PX">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="editStudentr(scope.row)"
            >编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
        <!-- 作用域插槽区域 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>
              <el-tag
                v-for="item in scope.row.tags"
                :key="item.id"
                closable
                :disable-transitions="false"
                @close="handleClose(tags)"
              >{{item.authName}}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改表格区域结束 -->
    <!-- dialog区域 -->
    <div>
      <!-- 修改用户 -->
      <el-dialog
        :title="edittable.title"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="ediDialogClosed"
      >
        <el-form :model="edittable" ref="editFormRef" label-width="70px">
          <el-form-item label="姓名" prop="id">
            <el-input v-model="edittable.username" :disabled="!!dialogType"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="job_number">
            <el-input v-model="edittable.job_number"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <div v-if="!!dialogType">{{ this.genderEnum[edittable.gender] }}</div>
            <el-select v-else  v-model="edittable.gender">
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宿舍号" prop="dept">
            <el-input v-model="edittable.dept"></el-input>
          </el-form-item>
          <el-form-item label="证件号" prop="id_card">
            <el-input v-model="edittable.id_card"></el-input>
          </el-form-item>
          <el-form-item label="通行时间">
            <el-time-picker
              is-range
              v-model="edittable.passing_time"
              format="HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="timeChange"  
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="edittable.phone"></el-input>
          </el-form-item>
          <el-form-item label="是否拉黑">
            <el-switch
              v-model="edittable.is_blacklist"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              >
            </el-switch>
          </el-form-item>
          <el-form-item label="照片">
            <el-upload
              action="#"
              :limit="1"
              list-type="picture-card"
              :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      dialogType: 0, //0:新增学生 1:编辑学生信息
      genderEnum: ["女", "男"],
      blackEnum:["否", "是"],
      searchCondition: {
        cOne: ""
      },
      personnelData: [
        {
          id: "1",
          name: "张4",
          job_number: "4号宿舍的",
          gender: 0,
          dept: "604宿舍",
          id_card: "123123123213213",
          is_blacklist: 0,
          passing_time: [
            new Date(this.currentDate() + " 10:00"), 
            new Date(this.currentDate() + " 20:10")
          ],
          phone: "12345678901",
          photo: [],
          tags: [
            { id: 0, authName: "1号宿舍楼" },
            { id: 1, authName: "3号宿舍楼" },
            { id: 2, authName: "2号宿舍楼" }
          ]
        },
        {
          id: "2",
          name: "张5",
          job_number: "3号宿舍的",
          gender: 1,
          dept: "605宿舍",
          id_card: "1905444",
          is_blacklist: 1,
          passing_time: [
            new Date(this.currentDate() + " 12:00"), 
            new Date(this.currentDate() + " 15:10")
          ],
          phone: "12345678901",
          photo: [],
          tags: [
            { id: 0, authName: "1号宿舍楼" },
            { id: 1, authName: "3号宿舍楼" },
            { id: 2, authName: "2号宿舍楼" }
          ]
        }
      ],
      sexs: [
        {
          value: 0,
          label: "女"
        },
        {
          value: 1,
          label: "男"
        }
      ],
      edittable: {
        title: "新增用户",
        id: "",
        name: "",
        job_number: "",
        dept: "",
        id_card: "",
        passing_time: "",
        phone: "",
        photo: "...",
        gender: 0,
        is_blacklist: 0,
        tags: [
          { id: 0, authName: "" },
          { id: 1, authName: "" },
          { id: 2, authName: "" }
        ]
      },
      editDialogVisible: false,
      inputTag: ""
    };
  },
  methods: {
    SubmitCondition() {
      //   this.$http.post('searchCondition', this.searchRef)
      console.log("123");
    },
    addStudent() {
      this.dialogType = 0;
      this.edittable.title = "新增用户";
      this.edittable.id = "";
      this.edittable.name = "";
      this.edittable.job_number = "";
      this.edittable.dept = "";
      this.edittable.id_card = "";
      this.edittable.passing_time = [
        new Date(this.currentDate() + " 00:00"), 
        new Date(this.currentDate() + " 23:59")
      ];
      this.edittable.phone = "";
      this.edittable.photo = "...";
      this.edittable.gender = 0;
      this.edittable.is_blacklist = 0;
      this.editDialogVisible = true;
    },
    showEditDialog(id) {
      console.log(id);
    },
    editStudentr(row) {
      console.log(row);
      this.dialogType = 1;
      this.editDialogVisible = true;
      this.edittable = JSON.parse(JSON.stringify(row));
      this.edittable.title = "修改用户";
    },
    handleClose() {
      this.$messamge.success("删除成功");
    },
    ediDialogClosed(e) {
      console.log(e);
    },
    editUserInfo() {
      console.log("确定");
    },
    timeChange(date) {
      console.log(date);
    },
    formatDate(date) {
      return moment(date).format('HH:mm');
    },
    currentDate() {
      return moment().format("YYYY/MM/DD")
    },
    handleRemove(file) {
      console.log(file);
    },
    //图片识别
    imageDistinguish() {
      console.log('图片识别')
    },
    //到处模板
    outModel() {
      console.log('导出模板')
    }
  }
};
</script>
<style lang="less" scoped>
.formIput {
  width: 600px;
}
.input {
  width: 300;
}
</style>
