import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import echarts from 'echarts'


import VeLine from 'v-charts/lib/line.common'

Vue.component(VeLine.name, VeLine)

// 引入echarts
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
// 每一个vue的组件使用this 可以访问http 去访问axios发送请求
Vue.prototype.$http = axios
// 默认根路径
axios.defaults.baseURL = '127.0.0.1'
// 请求拦截器 axios添加拦截器 挂在回调函数 在发送请求请求期间 优先调用回调函数对请求预处理
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
