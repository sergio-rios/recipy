import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { auth } from './auth'
import { data } from './data'
import { file } from './file'
import { search } from './search'
import { tag } from './tag'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    data,
    file,
    search,
    tag
  },
  plugins: [createPersistedState({
    paths: ['auth'],
  })]
})
