import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss'
import installIcons from '@/icons'
import i18n from '@/i18n'
import installElement from '@/plugins/elements'
// 路由鉴权
import './permission'
// 全局属性
import installFilter from '@/filter'

const app = createApp(App)
installIcons(app)
installElement(app)
installFilter(app)
app.use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
