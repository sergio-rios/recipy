import service from './service'

export default class {
  static getAll() {
    return service.get(this.path)
  }

  static path = '/tag'
}