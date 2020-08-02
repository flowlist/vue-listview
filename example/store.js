import Vue from 'vue'
import Vuex from 'vuex'
import store from '../src/store'
import * as api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    flow: store({ api })
  }
})
