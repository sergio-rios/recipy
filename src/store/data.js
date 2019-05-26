import axios from 'axios'
import { store } from '@/store/store'

const apiURL = process.env.VUE_APP_API_URL

export const data = {
  namespaced: true,

  state: {
    status: ''
  },

  actions: {
    async getOne({ commit }, id) {
      try {
        commit('loading')
        const token = store.state.auth.auth.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        const response = await axios.get(`${apiURL}user/${id}`)
        commit('success')
        return response
      }
      catch (error) {
        commit('failure')
        throw error.response.data.code
      }
    },

    async create({ commit }, params) {
      try {
        commit('loading')
        const response = await axios.post(`${apiURL}${params.path}`, params.data)
        commit('success')
        return response
      }
      catch (error) {
        commit('failure')
        throw error.response.data
      }
    },

    async update({ commit }, params) {
      try {
        commit('loading')
        const token = store.state.auth.auth.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        const response = await axios.put(`${apiURL}${params.path}`, params.data)
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