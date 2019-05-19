import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import en from 'vuetify/es5/locale/en'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#f3a719'
  },
  lang: {
    locales: { en, es },
    current: 'es'
  }
})
