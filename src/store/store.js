import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth'
//import { data } from './data'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    //data
  }
})
