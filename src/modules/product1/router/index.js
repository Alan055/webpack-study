import Vue from 'vue'
import Router from 'vue-router'
import home from './../components/home/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: home}, // 首页
    {path: '/forum', name: 'forum', component: ()=>import ('./../components/forum/index')}, // 论坛
    {path: '/instance', name: 'instance', component: ()=>import ('./../components/instance/index')}, // 分享实例
    {path: '/tools', name: 'tools', component: ()=>import ('./../components/tools/index')}, // 工具
    {path: '/share', name: 'share', component: ()=>import ('./../components/share/index')}, // 我要分享
    {path: '/login', name: 'login', component: ()=>import ('./../components/login/index')}, // 登录
    {path: '/register', name: 'register', component: ()=>import ('./../components/register/index')}, // 注册
    {path: '/about', name: 'about', component: ()=>import ('./../components/about/index')}, // 关于我们
    {path: '/forgetPassword', name: 'forgetPassword', component: ()=>import ('./../components/forgetPassword/forgetPassword')}, // 忘记密码
    {path: '/modifyPassword', name: 'modifyPassword', component: ()=>import ('./../components/forgetPassword/modifyPassword')}, // 修改密码



    {path: '/reptile', name: 'reptile', component: ()=>import ('./../components/reptile.vue')}, //
    {path: '/movie', name: 'movie', component: ()=>import ('./../components/movie.vue')},
    {path: '/annotationRate', name: 'annotationRate', component: ()=>import ('./../components/annotationRate.vue')},
  ]
})
