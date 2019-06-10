import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import en from 'vuetify/es5/locale/en'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#f3a719',
    secondary: '#777777',
    success: '#30a56a',
    warn: '#ffc339',
    error: '#ff3a3a'
  },
  lang: {
    locales: { en, es },
    current: 'es'
  }
})
