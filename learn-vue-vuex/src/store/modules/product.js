import * as types from '../mutation-types'

const state = [
  { id: 1014, price: 8.34, name: 'book', num: 2 },
  { id: 1021, price: 1.00, name: 'book', num: 13 },
  { id: 1036, price: 6.57, name: 'book', num: 3 }
]

const getters = {
  sortPrice: state => state.sort((a, b) => a.price - b.price)
}

const actions = {}

const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    state.find(p => p.id === id).num--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
