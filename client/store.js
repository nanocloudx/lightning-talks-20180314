import Vue from 'vue'
import Vuex from 'vuex'
import actions from './stores/actions'
import mutations from './stores/mutations'
import state from './stores/state'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  state
})
