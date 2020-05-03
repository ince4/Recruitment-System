import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      hideSideBar: true
    }
  },
  // {
  //   path: '*',
  //   redirect: '/article/list'
  // },
  {
    name: 'articleList',
    path: '/article/list',
    component: () => import('../views/ArticleList.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = router.app.$cookies.get('loginStatus')
  if (isLogin !== 'logged' && to.path !== '/login') {
    next('/login')
  }
    next()
})
export default router
