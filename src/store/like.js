import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const data = {
  namespaced: true,

  state: {
    status: ''
  },

  actions: {
    async get({ commit }, data) {
      try {
        commit('loading')
        const token = store.state.auth.auth.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        const response = await axios.get(`${apiURL}${path}`)
        commit('success')
        return response
      }
      catch (error) {
        commit('failure')
        throw error.response.data.code
      }
    }
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    success(state) {
      state.status = 'success'
    },

    failure(state) {
      state.status = 'failure'
    },
  }
}