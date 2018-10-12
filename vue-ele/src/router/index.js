import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const Order = _ => import('@/views/order/order.vue')
const Shop = _ => import('@/views/shop/shop.vue')
const Home = _ => import('@/views/home/home.vue')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/order', name: 'Order', component: Order },
    { path: '/home', name: 'Home', component: Home },
    { path: '/shop', name: 'Shop', component: Shop }
  ]
})
