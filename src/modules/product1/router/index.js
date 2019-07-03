import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './../components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/reptile', name: 'reptile', component: ()=>import ('./../components/reptile.vue')},
    {path: '/movie', name: 'movie', component: ()=>import ('./../components/movie.vue')},
  ]
})
