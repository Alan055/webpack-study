// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './../App'
import store from './vuex/index'
import router from './router/index'
import iView from "iview";
import 'iview/dist/styles/iview.css';

Vue.use(iView);

import plugin from "@/js/plugin";
Vue.use(plugin)


Vue.config.productionTip = false

import resource from 'vue-resource';

Vue.use(resource);
// 这三行是强制post的请求变成表单提交，因为有些后台接口必须使用表单提交formData。
Vue.http.options.emulateJSON = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
// resouce拦截器   必须在use后面加入
Vue.http.interceptors.push(function (request, next) {
  next((response) => {
    // 如果返回的数据是-1  说明是未登录状态   某些有登录限制的页面不能进去  要跳出来
    // if (response.data === -1) {
    //   if (location.href.search(/lottery|userCenter/) > -1) {
    //     this.$router.push({path: '/'})
    //     console.log('未登录，拦截器拦截')
    //   }
    //   return
    // }
    if(response.status !== 200){
      console.log(`${response.url} 接口报错了 状态码为：${response.status}`)
      return
    }else{
      return response
    }

  });
})
import service from "@/js/service";
window.service = service

Vue.prototype.$eventBus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
