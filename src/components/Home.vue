<template>
<el-container>
  <!-- 头部 -->
  <el-header>
    <div>
      <span class="head_title">智慧人脸识别演示后台</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
    <el-button type="success" @click="goindex">返回主页</el-button>
  </el-header>
  <!-- 主体区域 -->
  <el-container>
      <!-- 侧边栏 -->
<el-aside width="200px">
<!-- 菜单栏目开始 当开启了router的时候会把item 中的index作为跳转的url-->
<el-menu text-color="#333744"  unique-opened router>
  <!-- 一级菜单栏 -->
  <el-submenu :index="'/'+item.path" v-for="item in menulist" :key="item.id">
     <!-- 一级菜单栏模板区域 -->
    <template slot="title">
      <i :class= "iconsOBJ[item.id]"></i>
      <span slot="title">{{item.authName}}</span>
    </template>
    <!-- 二级菜单栏 -->
      <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
        <template slot="title">
          <i :class = "iconsOBJ[subitem.id]"></i>
          <span slot="title">{{subitem.authName}}</span>
        </template>
      </el-menu-item>
  </el-submenu>
</el-menu>
    </el-aside>
    <!-- 右侧主体 -->
    <el-main>
      <!-- 要嵌套 一个子路由占位符 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      label: false,
      menulist: [{
        id: 1,
        authName: '人员管理',
        children: [
          {
            id: 101,
            icon: 'el-icon-menu',
            authName: '人员信息管理 ',
            path: 'personnelMessage',
            children: ''
          },
          {
            id: 102,
            icon: 'el-icon-menu',
            authName: '黑名单管理',
            path: 'blackListManagement',
            children: ''
          }
        ]
      },
      {
        id: 2,
        authName: '寝室管理',
        path: '/menu2',
        children: [
          {
            id: 201,
            authName: '就寝情况管理',
            icon: 'el-icon-menu',
            path: 'foo',
            children: ''
          }
        ]
      },
      {
        id: 3,
        authName: '智慧用电',
        path: '/menu222',
        children: [
          {
            id: 201,
            authName: '智慧用电监控',
            icon: 'el-icon-menu',
            path: 'electricWisdom',
            children: ''
          }
        ]
      }
      ],
      iconsOBJ: {
        1: 'el-icon-menu',
        2: 'el-icon-menu',
        3: 'el-icon-menu',
        101: 'el-icon-menu',
        201: 'el-icon-menu',
        102: 'el-icon-menu',
        103: 'el-icon-menu'
      }
    }
  },
  created () {
    // this.getMeaulist()  这里是钩子函数
  },
  methods: {
    goindex () {
      this.$router.push('/index')
    },
    logout () {
      this.$router.push('/login')
      window.sessionStorage.removeItem('token')
    },
    async getMeaulist () {
      const { data: res } = await this.$http.get('/getmenulist')
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
  display: flex;
  background-color: #DCDFE6;
  padding-left: 0;
  align-items: center;
}
.el-button {
  float: right;
}
.el-aside{
  background-color: #E4E7ED;
}
.el-main{
  background-color: #eaedf1;
}
.el-container {
  height: 100%;
  overflow: hidden;
}
.head_title{
  font: 16px Medium;
  padding: 15px;
  background-color: #909399;
  border-radius: 30px
}
</style>
