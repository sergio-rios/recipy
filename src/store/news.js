import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const news = {
  namespaced: true,

  state: {
    news: [],
    status: ''
  },

  getters: {
    news: state => state.news,
    status: state => state.status
  },

  actions: {
    async getNews({ commit }) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/news`)
        commit('okNews', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error)
      }
    }
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    okNews(state, data) {
      state.news = data
      state.status = 'success'
    },

    error(state) {
      state.status = 'error'
    },
  }
}