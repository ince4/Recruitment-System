import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../views/ArticleList'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'article-list',
    redirect: 'article/list'
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: 'article/list',
    name: 'article-list',
    component: ArticleList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
