import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import NotFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
