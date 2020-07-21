import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueThree from '../src/index'

Vue.use(VueThree)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
