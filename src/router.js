import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store/store'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import NewAccount from '@/views/auth/NewAccount'
import Profile from '@/views/user/Profile'
import Settings from '@/views/user/Settings'
import Recipy from '@/views/recipy/Recipy'
import CreateRecipy from '@/views/recipy/CreateRecipy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/new-account', component: NewAccount },
    { path: '/user/:id', component: Profile, props: true },
    { path: '/user/:id/settings', component: Settings, props: true },
    { path: '/recipy/create', component: CreateRecipy },
    { path: '/recipy/:id', component: Recipy, props: true },
  ]
})

// Comprobar antes de servir la vista si es privada
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicRoutes = ['/login']
  const isPrivate = !publicRoutes.includes(to.path)
  const authUser = store.state.auth.auth

  if (isPrivate && !authUser) {
    return next('/login')
  }

  next()
})

export default router