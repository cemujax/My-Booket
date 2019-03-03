import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import Booket from '@/views/Booket'
import Contacts from '@/views/Contacts'
import NotFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    },
    {
      path: '/booket',
      name: 'booket',
      component: Booket
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: "/signup",
      name: 'signup',
      component: Signup
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
