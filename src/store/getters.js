import variables from '@/style/variables.module.scss'

const getters = {
  token: state => state.user.token,
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  userInfo: state => state.user.userInfo,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened
}

export default getters
