<template lang="pug">
.product
  .product-item(v-for="item in product")
    .product-name {{ item.name }} - $ {{ item.price }} - {{ item.num }} 
    .product-buy-button(@click='addToCart(item)') buy!buy!buy!

</template> 
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'product',
  mounted () {
  },
  computed: {
    ...mapState(['product'])
  },
  methods: {
    ...mapActions(['addToCart'])
  }
}
</script>
<style lang="stylus" scoped>
.product-item
  display: flex;
  justify-content: space-between;
  margin: 10px 50px;
</style>
