export default [
  { path: '/', redirect: { name: 'Shop' } },
  { path: '/shop', name: 'Shop', component: resolve => require(['../components/Shop.vue'], resolve) },
  { path: '/product', name: 'Product', component: resolve => require(['../components/Product.vue'], resolve) }
]
