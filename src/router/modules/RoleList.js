import layout from '@/layout/index'

export default {
  name: 'roleList',
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  meta: {
    title: 'user',
    icon: 'user-circle'
  },
  children: [
    {
      path: '/user/role',
      name: 'roleList',
      component: () => import('@/views/roleList/index'),
      meta: {
        title: 'roleList',
        icon: 'role'
      }
    }
  ]
}
