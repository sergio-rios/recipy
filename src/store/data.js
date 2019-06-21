import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const data = {
  namespaced: true,

  state: {
    status: ''
  },

  actions: {
    async get({ commit }, path) {
      try {
        commit('loading')        
        const response = await axios.get(`${apiURL}/${path}`)
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
        const response = await axios.post(`${apiURL}/${params.path}`, params.data)
        commit('success')
        commit('alert/setAlert', {
          text: 'Operación completada con exito',
          type: 'success',
        }, { root: true});
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
        const response = await axios.put(`${apiURL}/${params.path}`, params.data)
        commit('success')
        return response
      }
      catch (error) {
        commit('failure')
        throw error.response.data.code
      }
    },

    async delete({ commit }, path) {
      try {
        commit('loading')        
        const response = await axios.delete(`${apiURL}/${path}`)
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