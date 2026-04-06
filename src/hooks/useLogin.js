import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
//import api from '../models/users';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        //consumir api
        const data = {
            "email": email,
            "passwor": password
        }
        const response = await api.post('/login');
        console.log('response', response)

        // Validación campos vacíos
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Los campos son obligatorios');
            return;
        }

        //Validación con REGEX (helper)
        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Email no válido');
            return;
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert(
                'Error',
                'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
            );
            return;
        }

        try {
            // MOCK LOGIN
            const fakeToken = "abc123token";

            // Guardar token (sensible)
            await StorageService.saveToken('authToken', fakeToken);

            // Guardar usuario (no sensible)
            await StorageService.setItem('user', { email });

            Alert.alert('Éxito', 'Iniciando sesión...', [
                {
                    text: 'OK',
                    onPress: () => router.replace('/home')
                }
            ]);

        } catch (error) {
            Alert.alert('Error', 'Algo salió mal');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin
    };
};