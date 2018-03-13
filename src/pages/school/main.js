/**
 * 入口文件
 */

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import home from './home'
Vue.use(VueRouter)
Vue.config.productionTip = false

const User = { template: '<div>User</div>'}
const routes = [{ path: '/foo/:id', component: home }]
const router = new VueRouter({
  // mode: 'history',
  base:'/school/',
  routes
})
console.log(router)
let app = new Vue({
  template: '<App/>',
  router,
  components: { App }
}).$mount("#app")
