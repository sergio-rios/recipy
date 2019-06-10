import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const follow = {
  namespaced: true,

  state: {
    following: null,
    status: ''
  },

  getters: {
    following: state => state.following,
    status: state => state.status
  },

  actions: {
    async follow({ commit }, id) {
      try {
        commit('loading')        
        await axios.post(`${apiURL}/follow/follow/${id}`)
        commit('okFollow')
      }
      catch (error) {
        console.error(error)
        commit('error')
      }
    },

    async unfollow({ commit }, id) {
      try {
        commit('loading')        
        await axios.delete(`${apiURL}/follow/unfollow/${id}`)
        commit('okUnFollow',)
      }
      catch (error) {
        console.error(error)
        commit('error')
      }
    },

    async following({ commit }, id) {
      try {
        commit('loading')        
        const response = await axios.get(`${apiURL}/follow/following/${id}`)
        commit('okFollowing', response.data)
      }
      catch (error) {
        console.error(error)
        commit('error')
      }
    },
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    okFollow(state) {
      state.status = 'success'
    },

    okUnFollow(state) {
      state.status = 'success'
    },

    okFollowing(state, data) {
      state.following = data
      state.status = 'success'
    },

    error(state) {
      state.status = 'error'
    },
  }
}