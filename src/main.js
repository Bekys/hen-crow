import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'
// 移动端代码调试工具
// 屏蔽eslint代码检查，因为不需要调用
// 在手机上可以看到控制台了
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

// console.log('test')

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
