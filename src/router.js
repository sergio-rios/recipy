import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/auth/Login'

Vue.use(Router)

const router = new Router({
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

// Comprobar antes de servir la vista si es privada
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicRoutes = ['/login']
  const isPrivate = !publicRoutes.includes(to.path)
  const authUser = JSON.parse(localStorage.getItem('authUser'))

  if (isPrivate && !authUser) {
    return next('/login')
  }

  next()
})

export default router