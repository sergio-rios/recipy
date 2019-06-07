export const file = {
  namespaced: true,

  state: {
    file: null,
    status: ''
  },

  getters: {
    file: state => state.file,
    status: state => state.status
  },

  mutations: {
    loading(state) {
      state.status = 'loading'
    },

    okFile(state, data) {
      state.file = data
      state.status = 'success'
    },

    clear(state) {
      state.file = null
    },

    failure(state) {
      state.status = 'failure'
    },
  }
}