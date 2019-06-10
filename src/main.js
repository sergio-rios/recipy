import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { lang, date } from './helpers/index'
import CKEditor from '@ckeditor/ckeditor5-vue';
import HttpInterceptor from '@/helpers/interceptor'

HttpInterceptor()

Vue.use(CKEditor)
Vue.use(date)
Vue.use(lang, { lang: 'es_ES' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
