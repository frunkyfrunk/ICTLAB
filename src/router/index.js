import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Stories from '@/components/Stories'
import Projects from '@/components/Projects'
import jQuery from 'jquery'
global.jQuery = jQuery
window.$ = jQuery;
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Stories',
      name: 'Stories',
      component: Stories
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects
    }
  ]
})
