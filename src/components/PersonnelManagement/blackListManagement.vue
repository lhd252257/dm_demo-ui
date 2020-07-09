<template>
    <div>
     <div>
         <el-table :data="userlist" border stripe>
                  <el-table-column type="index"> </el-table-column>
                  <el-table-column label="姓名" prop="username"> </el-table-column>
                  <el-table-column label="寝室" prop="roomNumber"> </el-table-column>
                  <el-table-column label="电话" prop="mobile"> </el-table-column>
                  <el-table-column label="备注" prop="remarks"> </el-table-column>
                  <el-table-column label="是否加入黑名单" >
                    <template slot-scope="scope">
                         <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                      <!-- 插槽 -->
                   </el-table-column>
         </el-table>
     </div>
        <el-button type="success" @click="showDialog">添加黑名单人员</el-button>
       <!-- 添加黑名单用户  -->
        <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="ediDialogClosed"
                >
            <el-form :model="editForm"  ref="editFormRef" label-width="70px" >
                <el-form-item label="姓名" >
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注"  prop="email">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号"  prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="学号"  prop="mobile">
                    <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
            <!-- 上传文件区域 -->
            <div>
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">上传黑名单人员人脸照片，一旦上传后所有人脸机识别到此人将自动警报</div>
              </el-upload>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userlist: [{ index: '1', username: '张三3', roomNumber: '101', mobile: '137555xxxxx', remarks: '可疑人员，重点关注', mg_state: true },
        { index: '1', username: '张三3', roomNumber: '101', mobile: '137555xxxxx', remarks: '可疑人员，重点关注', mg_state: true }],
      editForm: {
        username: '黑名单人员',
        email: '1155660@qq.com',
        mobile: '137xxxx6666',
        remarks: '行为可疑重点关注'
      },
      editDialogVisible: false
    }
  },
  methods: {
    userStateChanged (row) {
      console.log(row)
    },
    ediDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.editDialogVisible = false
    },
    showDialog () {
      this.editDialogVisible = true
    }
  }
}
</script>
<style lang="less">

</style>
