import Vue from 'vue'
import App from './app'
import store from './store'
import router from './router'
import FlowLoader from '../src/loader'

Vue.config.productionTip = false
Vue.component(FlowLoader.name, FlowLoader)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
