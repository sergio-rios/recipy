import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const search = {
  namespaced: true,

  state: {
    result: [],
    status: ''
  },

  getters: {
    result: state => state.result,
    tags: state => state.tags,
    selected: state => state.selected,
    status: state => state.status
  },

  actions: {
    async search({ commit }, data) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/search`, {
          params: data
        })
        commit('okSearch', response.data)
      }
      catch (error) {
        commit('failure')
        console.error(error)
      }
    },

    async getTags({ commit }) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/tag`)
        commit('okTags', response.data)
      }
      catch (error) {
        commit('failure')
        console.error(error)
      }
    },
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    okSearch(state, data) {
      state.result = data
      state.status = 'success'
    },

    okTags(state, data) {
      state.tags = data
      state.status = 'success'
    },

    failure(state) {
      state.status = 'failure'
    },

    clear(state) {
      state.result = []
    }
  }
}