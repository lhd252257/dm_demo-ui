import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'
import Foo from '../components/Foo.vue'
import PersonnelMessage from '../components/PersonnelManagement/PersonnelMessage.vue'
import UploadFiles from '../components/PersonnelManagement/uploadFiles.vue'
import BlackListManagement from '../components/PersonnelManagement/blackListManagement.vue'
import ElectricWisdom from '../components/electricWisdom/electricWisdom.vue'


//解决了导航跳转当前页面的错误提示
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/index',
      children: [
        { path: '/index', component: Index },
        { path: '/foo', component: Foo },
        { path: '/personnelMessage', component: PersonnelMessage },
        { path: '/UploadFiles', component: UploadFiles },
        { path: '/blackListManagement', component: BlackListManagement },
        { path: '/electricWisdom', component: ElectricWisdom }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
// to 将访问的路径 from 从哪个路径来 next 是一个函数表示放行
// next（’url‘）强制跳转  next（）放行
  if (to.path === '/login') return next()
  // 获取token
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('login')
  next()
})

export default router
