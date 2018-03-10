// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import icons from '@fortawesome/fontawesome-free-solid'
import Notifications from 'vue-notification'
import Buefy from 'buefy'
import { VueGithubCorners } from 'vue2-github-corners'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Notifications)
Vue.component('VueGithubCorners', VueGithubCorners)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
