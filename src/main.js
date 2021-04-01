import './mock'
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from '@/router'
import {showMessage} from './utils/index'
import './bus'

Vue.prototype.$showMessage = showMessage

import vLoading from './directives/loading'
Vue.directive('loading',vLoading)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


// import bus from './bus'
// function hander1(value){
//   console.log('hander1:',value)
// }
// function hander2(value){
//   console.log('hander2:',value)
// }
// bus.$on("hander1",hander1)
// bus.$on("hander1",hander2)
// bus.$on("hander2",hander2)
// window.hander1 = hander1
// window.hander2 = hander2
// window.bus = bus
