import request from '@/utils/request'

export const feature = (data) => {
  return request({
    url: '/user/feature',
    method: 'POST',
    data
  })
}

export const chapter = (data) => {
  return request({
    url: '/user/chapter',
    method: 'POST',
    data
  })
}
