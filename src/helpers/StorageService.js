import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

class StorageService {

    //REGEX
    static patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

    static validate(type, value) {
        return this.patterns[type]?.test(value) || false;
    }

    //ASYNC STORAGE (NO sensible)
    static async setItem(key, value) {
        try {
            const stringValue =
                typeof value === 'object'
                    ? JSON.stringify(value)
                    : String(value);

            await AsyncStorage.setItem(key, stringValue);
        } catch (error) {
            console.error('Error guardando en AsyncStorage', error);
        }
    }

    static async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);

            if (value === null) return null;

            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            console.error('Error obteniendo de AsyncStorage', error);
            return null;
        }
    }

    // 🔐 SECURE STORE (sensible)
    static async saveToken(key, token) {
        try {
            await SecureStore.setItemAsync(key, token);
        } catch (error) {
            console.error('Error en Secure Storage', error);
        }
    }

    static async getToken(key) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error('Error obteniendo token', error);
            return null;
        }
    }

    static async removeToken(key) {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error('Error eliminando token', error);
        }
    }
}

export default StorageService;