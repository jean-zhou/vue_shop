import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 引入阿里图标库
import './assets/fonts/iconfont.css'

// 引入ajax
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
// 请求拦截器，通过其添加token
axios.interceptors.request.use(config => {
  // 为请求头添加 Authorization 字段添加token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
