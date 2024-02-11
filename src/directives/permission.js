import store from '@/store'
// 按钮权限
function checkPermission (el, binding) {
  const { value } = binding
  // 获取当前用户按钮权限
  const points = store.getters.userInfo.permission.points
  if (value && Array.isArray(value)) {
    const hasPermission = points.some(point => value.includes(point))
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value must be Array')
  }
}

export default {
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  update (el, binding) {
    checkPermission(el, binding)
  }
}
