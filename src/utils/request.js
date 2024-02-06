import axios from 'axios'
import { showMessage } from '@/utils/tools'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token已经失效，请重新登陆'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 配置接口国际化
  config.headers['Accept-Language'] = store.getters.language
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data, code } = response.data
    if (success) {
      return data
    } else {
      showMessage(message, 'error')
      if (code === 401) { // 标识服务端token失效
        store.dispatch('user/logout')
      }
      return Promise.reject(new Error(message))
    }
  },
  error => {
    showMessage(error.message, 'error')
    return Promise.reject(new Error(error))
  })

export const postRequest = (url = '', data = {}) => {
  return service({
    url,
    method: 'POST',
    data
  })
}

export default service
