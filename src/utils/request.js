import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

export const postRequest = (url = '', data = {}) => {
  return service({
    url,
    method: 'POST',
    data
  })
}

export default service
