import axios from 'axios'
import { store } from '@/store/store'

const apiURL = process.env.VUE_APP_API_URL

export const tag = {
  namespaced: true,

  state: {
    selected: [],
    tags: [],
    status: ''
  },

  getters: {
    selected: state => state.selected,
    tags: state => state.tags,
    status: state => state.status
  },

  actions: {
    async getTags({ commit }) {      
      try {
        commit('loading')
        const token = store.getters['auth/token']
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.get(`${apiURL}/tag`)
        commit('success', response.data)
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

    success(state, tags) {
      state.tags = tags
    },

    failure(state) {
      state.status = 'failure'
    },

    set(state, items) {
      state.selected = items
    },

    remove(state, item) {
      state.selected = state.selected.filter(tag => tag.id !== item.id)
    },
  }
}