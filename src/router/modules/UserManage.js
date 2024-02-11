import layout from '@/layout/index'

export default {
  name: 'userManage',
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
}
