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
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 用户已登陆
    if (to.path === '/login') {
      next('/')
    } else {
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
