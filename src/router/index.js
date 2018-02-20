import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: HelloWorld
    },
    {
      path: '/Celestial',
      name: 'Celestials',
      component: HelloWorld
    },
    {
      path: '/calender',
      name: 'Calender',
      component: HelloWorld
    },
    {
      path: '/events',
      name: 'Key Events',
      component: HelloWorld
    },
    {
      path: '/figures',
      name: 'Key Figures',
      component: HelloWorld
    },
    {
      path: '/towns',
      name: 'Towns & Cities',
      component: HelloWorld
    },
    {
      path: '/religion',
      name: 'Religion',
      component: HelloWorld
    }
  ]
})
