// initial state
const state = {
  role: 'admin'
}

// mutations
const mutations = {
  setUser(state, user) {
    Object.assign(state, user)
  },
  clearUser(state) {
    for (let key in state) {
      delete state[key]
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
