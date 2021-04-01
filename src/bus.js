// const listener = {}

// export default {
//     $on(event,handler){
//         if(!listener[event]){
//             listener[event] = new Set()
//         }
//         listener[event].add(handler)
//     },
//     $off(event,handler){
//         if(!listener[event]){
//             return
//         }
//         listener[event].delete(handler)
//     },
//     $emit(event,...args){
//         if(!listener[event]){
//             return
//         }
//         for (const handler of listener[event]) {
//             handler(...args)
//         }

//     }
// }

import Vue from 'vue'
Vue.prototype.$bus =  new Vue({})