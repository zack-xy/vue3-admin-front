import layout from '@/layout/index'

export default {
  name: 'permissionList',
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'user-circle'
  },
  children: [
    {
      path: '/user/permission',
      name: 'permissionList',
      component: () => import('@/views/permissionList/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
