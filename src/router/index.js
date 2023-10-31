import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'

/**
 * 公共路由,没有权限
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'yonghu'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/errorPage/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/errorPage/401')
      }
      // 401

    ]
  }
]

/**
 * 私有路由表，有权限
 */
const privateRoutes = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'yonghu'
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/userManage/index'),
        meta: {
          title: 'userManage',
          icon: 'yonghu'
        }
      },
      {
        path: '/user/role',
        name: 'roleList',
        component: () => import('@/views/roleList/index'),
        meta: {
          title: 'roleList',
          icon: 'yonghu'
        }
      },
      {
        path: '/user/permission',
        name: 'permissionList',
        component: () => import('@/views/permissionList/index'),
        meta: {
          title: 'permissionList',
          icon: 'yonghu'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/userInfo/index'),
        meta: {
          title: 'userInfo',
          icon: 'yonghu'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport',
          icon: 'yonghu'
        }
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'yonghu'
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        component: () => import('@/views/articleRanking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'yonghu'
        }
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import('@/views/articleDetail/index'),
        meta: {
          title: 'articleDetail'
        }
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        component: () => import('@/views/articleCreate/index'),
        meta: {
          title: 'articleCreate',
          icon: 'yonghu'
        }
      },
      {
        path: '/article/editor/:id',
        name: 'articleEditor',
        component: () => import('@/views/articleCreate/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
