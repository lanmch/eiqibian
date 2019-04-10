// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import GLOBAL_ from '../src/components/common/GLOBAL.vue'
import qs from 'qs'
Vue.prototype.$qs = qs;
import App from './App'
import router from './router'
Vue.prototype.GLOBAL = GLOBAL_
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
