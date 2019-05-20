import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const auth = {
  namespaced: true,

  state: {
    status: 'loggedOut'
  },

  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('authRequest')
        axios.post(`${apiURL}login`, user)
          .then(response => {
            const authUser = JSON.stringify(response.data)
            localStorage.setItem('authUser', authUser)
            axios.defaults.headers.common['Authorization'] = `Bearer ${authUser.token}`
            commit('authSuccess')
            resolve(response)
          })
          .catch(error => {
            commit('authError')
            localStorage.removeItem('authUser')
            reject(error)
          })
      })
    },

    logout({commit}) {
      return new Promise((resolve) => {
        localStorage.removeItem('authUser')
        delete axios.defaults.headers.common['Authorization']
        commit('logout')
        resolve()
      })
    }
  },

  mutations: {
    authRequest(state) {
      state.status = 'loggingIn'
    },

    authSuccess(state) {
      state.status = 'loggedIn'
    },

    authError(state) {
      state.status = 'logginError'
    },

    logout(state) {
      state.status = 'loggedOut'
    },
  }
}