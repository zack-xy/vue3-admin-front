import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss'
import installIcons from '@/icons'
import i18n from '@/i18n'
import installElement from '@/plugins/elements'

import './permission'

const app = createApp(App)
installIcons(app)
installElement(app)
app.use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
