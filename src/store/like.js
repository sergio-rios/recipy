import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const like = {
  namespaced: true,

  state: {
    status: ''
  },

  actions: {
    async like({ commit }, id) {
      try {
        commit('loading')
        await axios.post(`${apiURL}/like`, {
          post_id: id
        })
        commit('success')
      }
      catch (error) {
        console.log(error.response)
      }
    },

    async unlike({ commit }, id) {
      try {
        commit('loading')
        await axios.delete(`${apiURL}/like/${id}`)
        commit('success')
      }
      catch (error) {
        //
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