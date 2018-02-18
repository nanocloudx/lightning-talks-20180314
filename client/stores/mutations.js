import * as types from './mutation-types'

export default {
  [types.UPDATE_EXAMPLE](state, text) {
    state.example = text
  }
}
