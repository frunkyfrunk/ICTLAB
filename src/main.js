// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import Vuex from 'vuex'
global.jQuery = jQuery
let Bootstrap = require('bootstrap')
import '../src/css/bootstrap.min.css'
import '../src/css/main.css'
import swalPlugin from '../src/js/sweet-alert-plugin.js';

Vue.use(Vuex)
Vue.use(swalPlugin)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    computedboards: {}
  },
  mutations: {
    addBoard(state, board) {
      state.computedboards[board.id.toString()] = board
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})