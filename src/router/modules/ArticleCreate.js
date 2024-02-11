import layout from '@/layout/index'

export default {
  name: 'articleCreate',
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  meta: {
    title: 'article',
    icon: 'article'
  },
  children: [
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
