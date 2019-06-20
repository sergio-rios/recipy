import axios from 'axios'

const apiURL = process.env.VUE_APP_API_URL

export const trends = {
  namespaced: true,

  state: {
    week: [],
    month: [],
    status: ''
  },

  getters: {
    week: state => state.week,
    month: state => state.month,
    status: state => state.status
  },

  actions: {
    async getWeek({ commit }) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/featured/week`)
        commit('okWeek', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error.response)
      }
    },

    async getMonth({ commit }) {      
      try {
        commit('loading')
        const response = await axios.get(`${apiURL}/featured/month`)
        commit('okMonth', response.data)
      }
      catch (error) {
        commit('error')
        console.error(error.response)
      }
    },
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    okWeek(state, data) {
      state.week = data
      state.status = 'success'
    },

    okMonth(state, data) {
      state.month = data
      state.status = 'success'
    },

    error(state) {
      state.status = 'error'
    },
  }
}