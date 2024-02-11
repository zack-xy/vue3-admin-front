import router from '@/router'
import store from '@/store'

/** 登陆鉴权
 *  路由守卫
 * 1.用户已登陆，则不允许进入login
 * 2.用户未登陆，则只能进入login(白名单页面 )
 */

const whiteList = [
  '/login'
]

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 用户已登陆
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户信息是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo', { userName: store.getters.userName })
        // 处理用户权限，根据用户权限筛选路由
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        console.log('filterRoutes>>>>>', filterRoutes)
        // 循环添加动态路由
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加动态路由后，需要主动跳转以生效
        return next(to.path)
      }
      next()
    }
  } else {
    // 用户未登陆
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
