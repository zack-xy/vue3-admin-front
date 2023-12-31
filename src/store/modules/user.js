import { getUserInfo, login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUerInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login (context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          this.commit('user/setToken', data.token)
          router.push('/')
          setTimeStamp()
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    async getUserInfo (context) {
      const res = await getUserInfo()
      this.commit('user/setUerInfo', res)
      return res
    },
    logout () {
      this.commit('user/setToken', '')
      this.commit('user/setUerInfo', {})
      removeAllItem()
      // TODO 清理权限相关配置
      router.push('/login')
    }
  }
}
