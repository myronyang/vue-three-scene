import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: r => require.ensure([], () => r(require('../views/index')), 'index')
    },
    {
      path: '/fbx',
      name: 'fbx',
      component: r => require.ensure([], () => r(require('../views/fbx')), 'fbx')
    },
    {
      path: '/geometry',
      name: 'geometry',
      component: r => require.ensure([], () => r(require('../views/geometry')), 'geometry')
    },
    {
      path: '/shirt',
      name: 'shirt',
      component: r => require.ensure([], () => r(require('../views/shirt')), 'shirt')
    }
  ]
})