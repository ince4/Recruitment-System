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
    name: '企业信息',
    path: '/info',
    component: () => import('../views/Info.vue')
  },
  {
    name: '信息一览',
    path: '/list',
    component: () => import('../views/List.vue')
  },
  {
    name: '首页', 
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
    if (isLogin === 'logged') {
      next()
      if (to.path === '/index') {
        to.query.usertype = router.app.$cookies.get('usertype')
      }
    } else {
      next('/login')
    } 
  }
})

export default router
