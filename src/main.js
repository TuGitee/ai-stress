import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import './assets/font/iconfont.css'
import './assets/css/global.less'

import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL: './data'
})

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
