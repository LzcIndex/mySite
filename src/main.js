import './mock'
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from '@/router'
import {showMessage} from './utils/index'


import {getBanners} from './api/banner'
getBanners().then(res=>{
  console.log(res)
})


Vue.prototype.$showMessage = showMessage
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
