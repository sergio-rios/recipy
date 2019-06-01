import service from './service'

export default class {

  static getAll(postId) {
    return service.get(`${this.path}/${postId}`)
  }

  static post(data) {
    return service.post(this.path, data)
  }

  static delete(id) {
    return service.delete(`${this.path}/${id}`)
  }

  static path = '/comment'
}