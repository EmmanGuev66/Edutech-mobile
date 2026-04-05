import axios from 'axios';
import StorageService from '../services/StorageService';

class ApiClient {
  static instance = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://edutech-zxvy.onrender.com/api', // Cámbialo por tu URL
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this._initializeInterceptors();
  }

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  _initializeInterceptors() {
    // Interceptor de Petición (Request)
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Usamos tu StorageService para sacar el token de SecureStore
        const token = await StorageService.getToken('user_token');
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor de Respuesta (Response)
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.warn('Sesión expirada o no autorizada');
          // Aquí podrías llamar a StorageService.removeToken()
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos simplificados
  get(url, config = {}) {
    return this.axiosInstance.get(url, config);
  }

  post(url, data, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }
}

// Exportamos la instancia única (Singleton)
export default ApiClient.getInstance();