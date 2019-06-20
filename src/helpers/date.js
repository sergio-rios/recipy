export const date = {
  install(Vue) {
    Vue.prototype.$date = (_date) => {
      const date =  new Date(_date)
      const today = new Date()
      const diff = today.getTime() - date.getTime()
      const days = Math.round(diff / (1000 * 60 * 60 * 24))
      
      switch (days) {
        case 0:
          return 'Hoy'
        case 1:
          return 'Ayer'
        default:
          return date.toLocaleString([], {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
      }
    }

    Vue.prototype.$time = (date) => {
      return new Date(date).toLocaleString([], {
        hour: '2-digit',
        minute:'2-digit'
      })
    }
  }
}