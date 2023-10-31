import path from 'path'

const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

// 判断meta是否为空
function isNull (data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') return true
  return false
}

// 去除重复的子路由
export const filterRoutes = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => !childrenRoutes.find(childRoute => childRoute.path === route.path))
}

// 过滤掉不满足 meta && meta.title && meta.icon的数据
export const generateMenus = (routes, basePath = '') => {
  const result = []
  routes.forEach(item => {
    if (isNull(item.children) && isNull(item.meta)) return
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // meta存在
    // 不存在children，存在meta
    const routePath = path.resolve(basePath, item.path)
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    // 存在meta并且存在children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
