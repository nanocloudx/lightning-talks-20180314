import * as types from './mutation-types'

export default {
  updateExample({commit}, text) {
    commit(types.UPDATE_EXAMPLE, text)
  }
}
