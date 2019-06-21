import axios from 'axios'
import router from '@/router'
import { store } from '@/store/store'

export default function HttpInterceptor() {
    axios.interceptors.request.use(function(config) {
        const token = store.getters['auth/token']
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              router.push('/')
              store.commit('alert/setAlert', {
                text: 'ERROR 404: No existe el recurso.',
                type: 'error'
              })
              break

            case 401:
              router.push('/login')
              // store.commit('alert/setAlert', {
              //   text: 'La sesión ha caducado.',
              //   type: 'error'
              // })
              break

            case 400:
              break

            case 500:
              store.commit('alert/setAlert', {
                text: 'El servidor no response. Inténtalo más tarde.',
                type: 'error'
              })
              break

            default:
              router.push('/')
              store.commit('alert/setAlert', {
                text: 'Se ha producido un error desconocido.',
                type: 'error'
              })
          }
        }
        return Promise.reject(error)
      }
    );
}