import axios from 'axios'
import { store } from '@/store/store'

const token = store.getters['auth/token']
//console.log(token)

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { Authorization: `Bearer ${token}` }
})