import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import config from './modules/config'

Vue.use(Vuex)
// 配置信息存localstorage
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['config']
})
// 用户信息存sessionstorage
const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ['user']
})

// 需要被重置的state
const initialState = {
  user: { ...user.state },
  config: { ...config.state }
}

// const isDev = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  mutations: {
    rest(state) {
      Object.keys(state).forEach(key => {
        Object.assign(state[key], initialState[key])
      })
    }
  },
  modules: {
    user,
    config
  },
  plugins: [vuexLocal.plugin, vuexSession.plugin]
})
