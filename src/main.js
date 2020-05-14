import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//导入字体图标
import '@/assets/fonts/iconfont.css'
//导入全局样式表
import '@/assets/css/global.css'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
//通过axios请求拦截器添加 token,保证拥有获取数据的权限
//axios请求拦截
axios.interceptors.request.use(config => {
	//为请求头对象，添加Token验证的Authorization字段
	config.headers.Authorization = window.sessionStorage.getItem('token');
	return config;
})
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
