import * as types from '../mutation-types'

const state = {
  added: []
}

const getters = {
  cartList: state => state.added.price
}

const actions = {}

const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    console.info('cart, mutation')
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({ id, num: 1 })
    } else {
      record.num++
    }
  },
  [types.CHECKOUT_REQUEST] (state) {
    state.added = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
