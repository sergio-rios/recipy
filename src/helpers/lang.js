import { text } from "@/config/index";

export const lang = {
  install(Vue, options) {
    const { lang } = options

    Vue.prototype.$text = (V, F, N) => {
      let result = text[lang].filter(obj => {
        return obj.V === V & obj.F === F & obj.N === N
      })
      
      return result[0].T
        ? result[0].T
        : "[Not found]"
    }
  }
}