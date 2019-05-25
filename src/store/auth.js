import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const auth = {
  namespaced: true,

  state: {
    status: 'loggedOut',
    auth: {
      user: null,
      token: null
    }
  },

  actions: {
    async login({ commit }, user) {
      try {
        commit('authRequest')
        const response = await axios.post(`${apiURL}login`, user)
        commit('authSuccess', response.data)
      }
      catch (error) {
        commit('logginError')
        throw error.response.data.code
      }
    },

    async edit({ commit }, user) {
      commit('authUserChange', user)
    },

    logout({commit}) {
      delete axios.defaults.headers.common['Authorization']
      commit('logout')
    }
  },

  mutations: {
    authRequest(state) {
      state.status = 'loggingIn'
    },

    authSuccess(state, data) {
      state.status = 'loggedIn'
      state.auth.user = data.user
      state.auth.token = data.token
    },

    authUserChange(state, user) {
      state.auth.user = user
    },

    authError(state) {
      state.status = 'logginError'
      state.auth.user = null
      state.auth.token = null
    },

    logout(state) {
      state.status = 'loggedOut'
      state.auth.user = null
      state.auth.token = null
    },
  }
}