export const date = {
  install(Vue, options) {
    Vue.prototype.$date = (date) => {
      return new Date(date).toLocaleString([], {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }

    Vue.prototype.$time = (date) => {
      return new Date(date).toLocaleString([], {
        hour: '2-digit',
        minute:'2-digit'
      })
    }
  }
}