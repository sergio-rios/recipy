import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home
    }
  ]
})
