import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { auth } from './auth'
import { data } from './data'
import { file } from './file'
import { follow } from './follow'
import { search } from './search'
import { tag } from './tag'
import { user } from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    data,
    file,
    follow,
    search,
    tag,
    user
  },
  plugins: [createPersistedState({
    paths: ['auth'],
  })]
})
