import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'

// 时间戳格式化
const dateFilter = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 相对时间
dayjs.extend(rt)
function relativeTime (val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs().locale(store.getters.language === 'zh' ? 'zh-cn' : 'en').to(dayjs(val))
}

export default app => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
