import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { admin } from './admin'
import { alert } from './alert'
import { auth } from './auth'
import { data } from './data'
import { file } from './file'
import { follow } from './follow'
import { like } from './like'
import { news } from './news'
import { search } from './search'
import { tag } from './tag'
import { trends } from './trends'
import { user } from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    admin,
    alert,
    auth,
    data,
    file,
    follow,
    like,
    news,
    search,
    tag,
    trends,
    user
  },
  plugins: [createPersistedState({
    paths: ['auth'],
  })]
})
