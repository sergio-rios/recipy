import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const user = {
  namespaced: true,

  state: {
    user: null,
    posts: [],
    followers: [],
    following: [],
    status: ''
  },

  getters: {
    user: state => state.user,
    posts: state => state.posts,
    followers: state => state.followers,
    following: state => state.following,
    status: state => state.status
  },

  actions: {
    async getUser({ commit }, id) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/user/${id}`)
        commit('okUser', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error)
      }
    },

    async getPosts({ commit }, params) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/user/${params.id}/post/${params.init}/${params.num}`)
        commit('okPosts', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error)
      }
    },

    async getFollowers({ commit }, id) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/user/${id}/follower`)
        commit('okFollowers', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error)
      }
    },

    async getFollowing({ commit }, id) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/user/${id}/following`)
        commit('okFollowing', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error)
      }
    },
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    okUser(state, data) {
      state.user = data
      state.status = 'success'
    },

    okPosts(state, data) {
      data.forEach(post => state.posts.push(post))
      state.status = 'success'
    },

    okFollowers(state, data) {
      state.followers = data
      state.status = 'success'
    },

    okFollowing(state, data) {
      state.following = data
      state.status = 'success'
    },

    error(state) {
      state.status = 'error'
    },

    set(state, items) {
      state.selected = items
    },

    remove(state, item) {
      state.selected = state.selected.filter(tag => tag.id !== item.id)
    },

    clear(state) {
      state.selected = []
    }
  }
}