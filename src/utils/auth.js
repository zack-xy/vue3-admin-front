import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'

export function getTimeStamp () {
  return getItem(TIME_STAMP)
}

export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}

// 记录token的时间并对比过期时间，计算token是否过期
// 在请求拦截中主动判断token是否过期
export function isCheckTimeout () {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
