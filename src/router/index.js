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
  routes: [
    {
      path: '/',
      component: Home
    },
    { path: "/login", component: Login },
    {
      path: '/booket',
      component: Booket
    },
    {
      path: '/contacts',
      component: Contacts
    },
    { path: "/signup", component: Signup },
    {
      path: '*',
      component: NotFound
    }
  ]
})
