<template lang="pug">
.cart
  .cart-item(v-for="item in cartList") {{ item.name - item.pirce - item.num }}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'cart',
  computed: {
    ...mapGetters([
      'cartList'
    ])
  }
}
</script>
<style lang="stylus" scoped>
.cart
  margin-top: 100px;
  border-bottom: 1px solid #000;
</style>
