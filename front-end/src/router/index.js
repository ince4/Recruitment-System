import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: '/index'
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      hideSideBar: true
    }
  },
  {
    name: 'UserTypeSelect',
    path: '/usertypeselect',
    component: () => import('../views/UserTypeSelect.vue'),
    meta: {
      hideSideBar: true
    } 
  },
  {
    name: 'Information',
    path: '/information',
    component: () => import('../views/Information.vue')
  },
  {
    name: 'index', 
    path: '/index',
    component: () => import('../views/Index.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = router.app.$cookies.get('loginStatus')
  if (to.path == '/login') {
    if (isLogin === 'logged') {
      next(from)
    }
    next()
  } else {
    isLogin === 'logged' ? next() : next('/login')
  }
})

export default router
