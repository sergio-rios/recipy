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
        throw error.response.data.code
      }
    },

    async update({ commit }, data) {
      try {
        commit('loading')
        const token = store.state.auth.auth.token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        console.log(data)
        const response = await axios.put(`${apiURL}user/${data.id}`, data)
        commit('success')
        return response
      }
      catch (error) {
        console.error(error.response)
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