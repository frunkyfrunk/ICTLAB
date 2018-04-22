import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Stories from '@/components/Stories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Stories',
      name: 'Home',
      component: Stories
    }
  ]
})
