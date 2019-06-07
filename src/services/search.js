import service from './service'

export default class {
  static search(data) {
    console.log(data)
    return service.get(this.path, {
      params: data
    })
  }

  static path = '/search'
}