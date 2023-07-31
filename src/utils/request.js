import axios from 'axios'
import { showMessage } from '@/utils/tools'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      showMessage(message, 'error')
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
