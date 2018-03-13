import * as types from './mutation-types'

export default {
  updateSlideId({commit}, slideId) {
    commit(types.UPDATE_SLIDE_ID, slideId)
  }
}
