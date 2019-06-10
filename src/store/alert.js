export const alert = {
  namespaced: true,

  state: {
    text: '',
    type: '',
  },

  mutations: {
    setAlert(state, params) {
      state.text = params.text;
      state.type = params.type;
    }
  }
}