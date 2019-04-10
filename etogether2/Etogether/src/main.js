import Vue from 'vue'

import qs from 'qs';
Vue.prototype.$qs = qs;

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import Vuelidate from 'vuelidate'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import App from './App'
import router from './router'
import GLOBAL_ from '../src/components/common/GLOBAL'
Vue.prototype.GLOBAL = GLOBAL_
Vue.config.productionTip = false

Vue.use(Vuelidate)

import JsEncrypt from 'jsencrypt'
Vue.prototype.$jsEncrypt = JsEncrypt
	/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})