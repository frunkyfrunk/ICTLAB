import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Stories from '@/components/Stories'
import jQuery from 'jquery'
global.jQuery = jQuery
window.$ = jQuery;
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
