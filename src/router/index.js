import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cover',
    component: () => import('../views/cover.vue')
  },
  {
    path: '/mainpanel',
    component: () => import('../views/mainpanel.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../views/user/login.vue')
      },
      {
        path: 'register',
        component: () => import('../views/user/register.vue')
      },
      {
        path: 'home',
        component: () => import('../views/mainpanel/home.vue')
      },
      {
        path: 'list',
        component: () => import('../views/mainpanel/list.vue'),
        children: [
          {
            path: 'apis',
            name: 'apis',
            component: () => import('../views/mainpanel/list/apis.vue')
          },
          {
            path: 'timeline',
            name: 'timeline',
            component: () => import('../views/mainpanel/list/devtime.vue')
          },
          {
            path: '',
            redirect: '/mainpanel/list/apis'
          }
        ]
      },
      {
        path: 'personal',
        component: () => import('../views/mainpanel/personal.vue')
      },
      {
        path: '',
        redirect: '/mainpanel/home'
      }
    ]
  },
  {
    path: '/manage',
    component: () => import('../views/tm/manage.vue')
  },
  {
    path: '/setting',
    component: () => import('../views/tm/setting.vue')
  },
  {
    path: '/about',
    component: () => import('../views/tm/about.vue')
  },
  {
    path: '*',
    redirect: '/cover'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/epoch/',
  routes
})

export default router
