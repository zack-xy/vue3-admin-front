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
          icon: 'profile'
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
      icon: 'user-circle'
    },
    children: [
      {
        path: '/user/manage',
        name: 'userManage',
        component: () => import('@/views/userManage/index'),
        meta: {
          title: 'userManage',
          icon: 'users'
        }
      },
      {
        path: '/user/role',
        name: 'roleList',
        component: () => import('@/views/roleList/index'),
        meta: {
          title: 'roleList',
          icon: 'role'
        }
      },
      {
        path: '/user/permission',
        name: 'permissionList',
        component: () => import('@/views/permissionList/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/userInfo/index'),
        props: true, // 路由传递参数作为组件参数传入
        meta: {
          title: 'userInfo'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport'
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
      icon: 'article'
    },
    children: [
      {
        path: '/article/ranking',
        name: 'articleRanking',
        component: () => import('@/views/articleRanking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'ranking'
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
          icon: 'article-create'
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
