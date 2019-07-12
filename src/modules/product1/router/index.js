import Vue from 'vue'
import Router from 'vue-router'
import home from './../components/home/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: home},
    {path: '/forum', name: 'forum', component: ()=>import ('./../components/reptile.vue')},
    {path: '/', name: 'home', component: home},
    {path: '/', name: 'home', component: home},
    {path: '/', name: 'home', component: home},
    {path: '/', name: 'home', component: home},
    {path: '/reptile', name: 'reptile', component: ()=>import ('./../components/reptile.vue')},
    {path: '/movie', name: 'movie', component: ()=>import ('./../components/movie.vue')},
    {path: '/annotationRate', name: 'annotationRate', component: ()=>import ('./../components/annotationRate.vue')},
  ]
})
