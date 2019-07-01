// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './../App'
import router from './router/index'

Vue.config.productionTip = false

import resource from 'vue-resource';

Vue.use(resource);
// 这三行是强制post的请求变成表单提交，因为有些后台接口必须使用表单提交formData。
Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;

import service from "./../../js/service";

window.service = service

Vue.prototype.$eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
