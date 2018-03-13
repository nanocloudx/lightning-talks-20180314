import * as types from './mutation-types'

export default {
  [types.UPDATE_SLIDE_ID](state, slideId) {
    state.slideId = slideId
  }
}
