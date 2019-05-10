import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/MovieList'
import MovieAdd from '@/components/MovieAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MovieList',
      component: MovieList
    },
    {
      path: '/add',
      name: 'MovieAdd',
      component: MovieAdd
    }
  ]
})
