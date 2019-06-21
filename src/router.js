import Vue from 'vue'
import Router from 'vue-router'
import { store } from './store/store'

import Home from '@/views/home/Home'
import Login from '@/views/auth/Login'
import NewAccount from '@/views/auth/NewAccount'
import Profile from '@/views/user/Profile'
import Settings from '@/views/user/Settings'
import Recipy from '@/views/recipy/Recipy'
import CreateRecipy from '@/views/recipy/CreateRecipy'
import UserPost from '@/views/user/components/UserPost'
import UserFollower from '@/views/user/components/UserFollower'
import UserFollowing from '@/views/user/components/UserFollowing'
import News from '@/views/news/News'
import Trends from '@/views/trends/Trends'
import AdminPanel from '@/views/admin/AdminPanel'
import Verify from '@/views/auth/Verify'
import Password from '@/views/user/Password'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/new-account', component: NewAccount },
    { path: '/verify', component: Verify },
    { path: '/user/:id', component: Profile, props: true, children: [
      { path: 'posts', component: UserPost },
      { path: 'followers', component: UserFollower },
      { path: 'following', component: UserFollowing}
    ]},
    { path: '/user/:id/settings', component: Settings, props: true },
    { path: '/user/settings/password', component: Password },
    { path: '/recipy/create', component: CreateRecipy },
    { path: '/recipy/:id', component: Recipy, props: true },
    { path: '/news', component: News },
    { path: '/trends', component: Trends },
    { path: '/admin', component: AdminPanel },
    { path: '*', redirect: '/' }
  ]
})

// Comprobar antes de servir la vista si es privada
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicRoutes = ['/login', '/new-account']
  const isPrivate = !publicRoutes.includes(to.path)
  const authUser = store.getters['auth/user']

  if (to.path === '/login') {
    store.commit('auth/logout')
  }

  if (isPrivate && !authUser) {
    return next('/login')
  }

  if (authUser && authUser.verified === 0 && to.path != '/verify') {
    return next('/verify')
  }

  // if (to.path === '/admin' && (!authUser || authUser.profile_id != 1)) {
  //   return next('/')
  // }

  if (!(from.path === '/' && to.path.match(/^\/recipy\/\d+$/))) {
    store.commit('tag/clear')
    store.commit('search/clear')
  }

  if (to.path.match(/^\/user\/\d+$/)) {
    return next(`${to.path}/posts`)
  }

  next()
})

export default router