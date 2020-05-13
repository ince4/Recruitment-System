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
    name: '资料编辑',
    path: '/userinfo',
    component: () => import('../views/UserInfo.vue')
  },
  {
    name: '信息一览',
    path: '/list',
    component: () => import('../views/List.vue')
  },
  {
    name: '职位管理',
    path: '/company/job/management',
    component: () => import('../views/company/JobManagement.vue')
  },
  {
    name: '招聘发布',
    path: '/company/job/publish',
    component: () => import('../views/company/JobPublish.vue')
  },
  {
    name: '收藏',
    path: '/candidate/collectionlist',
    component: () => import('../views/candidate/CollectionList.vue')
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
      to.query.usertype = router.app.$cookies.get('usertype')
      next()
    } else {
      next('/login')
    } 
  }
})

export default router
