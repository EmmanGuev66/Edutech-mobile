import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

class StorageService {

    static KEYS = {
        TOKEN: "user_token",
        USER: "user_data"
    };

    static patterns = {
        email: /^ad\d+@school\.com$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };

    static validate(type, value) {
        return this.patterns[type]?.test(value) || false;
    }

    static async setItem(key, value) {
        try {
            const stringValue =
                typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value);

            await AsyncStorage.setItem(key, stringValue);
        } catch (error) {
            console.error("Error guardando", error);
        }
    }

    static async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    }

    static async saveToken(key, token) {
        await SecureStore.setItemAsync(key, token);
    }

    static async getToken(key) {
        return await SecureStore.getItemAsync(key);
    }

    static async removeToken(key) {
        await SecureStore.deleteItemAsync(key);
    }

    static async saveUser(user) {
        await this.setItem(this.KEYS.USER, user);
    }

    static async getUser() {
        return await this.getItem(this.KEYS.USER);
    }
}

export default StorageService;