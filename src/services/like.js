import service from './service'

export default class {
  static like(data) {
    return service.post(this.path, data)
  }

  static unlike(id) {
    return service.delete(`${this.path}/${id}`)
  }

  static path = '/like'
}