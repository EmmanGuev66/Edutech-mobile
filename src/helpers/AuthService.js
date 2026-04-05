import api from '../network/ApiClient';
import { ENDPOINTS } from '../network/EndPoints';
import StorageService from '../services/StorageService';

class AuthService {
  static async login(email, password) {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
        Email: email,
        Password: password
      });

      // Si la API devuelve el token en response.data.token
      if (response.data && response.data.token) {
        await StorageService.saveToken('user_token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  }
}

export default AuthService;