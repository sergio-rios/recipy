import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { auth } from './auth'
import { data } from './data'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    data
  },
  plugins: [createPersistedState()]
})
