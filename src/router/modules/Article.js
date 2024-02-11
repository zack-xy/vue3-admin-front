import layout from '@/layout/index'

export default {
  name: 'articleRanking',
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
    }
  ]
}
