<template lang="pug">
#shop 
  product
  cart
</template>
<script>
import Cart from './Cart'
import Product from './Product'
export default {
  name: 'shop',
  components: { Cart, Product }
}
</script>
<style lang="stylus" scoped>
</style>
