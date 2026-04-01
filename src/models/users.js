import axios from 'axios';
import { getToken } from '../helpers/StorageService';

const apiUsers = axios.create({
    baseURL: 'localhost:3000/api/login/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',

    }
});

apiUsers.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken('JWTTOKEN');

            //solo si el token existe, lo agregamos a los headers
            if(token !== null){
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    
    },

    (error) => {
        return Promise.reject(error);
    }
)

export default api;