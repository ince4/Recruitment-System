import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleList from '../views/ArticleList'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      hideSideBar: true
    }
  },
  {
    path: '/',
    name: 'article-list',
    redirect: '/article/list'
  },
  {
    path: '/article/list',
    name: 'article-list',
    component: ArticleList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
