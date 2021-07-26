// initial state
const state = {
  collapse: false
}

// mutations
const mutations = {
  setConfig(state, config) {
    Object.assign(state, config)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
