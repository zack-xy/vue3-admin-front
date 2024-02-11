import { publicRoutes, privateRoutes } from '@/router'
export default {
  namespaced: true,
  state: () => ({
    // 初始化时的路由表
    routes: publicRoutes
  }),
  mutations: {
    setRoutes (state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 根据权限数据筛选路由
    filterRoutes (context, menus) {
      const routes = []

      menus.forEach(key => {
        routes.push(...privateRoutes.filter(item => item.name === key))
      })

      routes.push(
        // 不匹配的路由，必须在最后
        {
          path: '/:catchAll(.*)',
          redirect: '/404'
        })

      context.commit('setRoutes', routes)

      return routes
    }
  }
}
