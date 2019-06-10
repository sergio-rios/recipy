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
            case 401:
              router.push('/login')
              break
          }
        }
        return Promise.reject(error)
      }
    );
}