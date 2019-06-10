import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const auth = {
  namespaced: true,

  state: {
    status: 'loggedOut',
    auth: {
      user: null,
      token: null,
    },
    timer: null
  },

  getters: {
    user: state => state.auth.user,
    token: state => state.auth.token
  },

  actions: {
    async login({ commit, dispatch, state }, user) {
      try {
        commit('authRequest')
        const response = await axios.post(`${apiURL}/login`, user)
        // Refresh token 10 min before expires
        const timeout = (response.data.expires - 600) * 1000
        state.timer = setTimeout(dispatch, timeout, 'refresh')
        commit('authSuccess', response.data)
      }
      catch (error) {
        commit('authError')
        throw error.response.data
      }
    },

    async refresh({ commit, dispatch, state }) {
      try {
        commit('authRequest')        
        const response = await axios.get(`${apiURL}/token/refresh`)
        // Refresh token 10 min before expires
        const timeout = (response.data.expires - 600) * 1000
        state.timer = setTimeout(dispatch, timeout, 'refresh')
        commit('authSuccess', response.data)
      }
      catch (error) {
        commit('authError')
        throw error.response.data
      }
    },

    async resend({ commit }, id) {
      try {   
        await axios.get(`${apiURL}/user/${id}/resend-verification`)
      }
      catch (error) {
        commit('authError')
        throw error.response.data
      }
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

    userChange(state, user) {
      state.auth.user = user
    },

    authError(state) {
      state.status = 'logginError'
    },

    logout(state) {
      clearTimeout(state.timer)
      delete axios.defaults.headers.common['Authorization']
      state.status = 'loggedOut'
      state.auth.user = null
      state.auth.token = null
    },
  }
}