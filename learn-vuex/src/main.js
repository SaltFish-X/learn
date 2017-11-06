// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'

Vue.use(VueRouter)
/* eslint-disable no-new */

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
