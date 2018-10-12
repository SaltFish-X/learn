import * as types from './mutation-types'

export function addToCart ({ commit }, product) {
  if (product.num > 0) {
    commit(types.ADD_TO_CART, { id: product.id })
  }
}
