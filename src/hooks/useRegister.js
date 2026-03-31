import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const handleRegister = async () => {

        // 🔹 Campos vacíos
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        // 🔹 Validación email (REGEX)
        if (!StorageService.validate('email', email)) {
            Alert.alert('Error', 'Email no válido');
            return;
        }

        // 🔹 Validación password (REGEX)
        if (!StorageService.validate('password', password)) {
            Alert.alert(
                'Error',
                'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
            );
            return;
        }

        // 🔹 Confirm password
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            // 🔹 MOCK REGISTER

            const user = {
                name,
                email
            };

            const fakeToken = "newUserToken123";

            // Guardar usuario (NO sensible)
            await StorageService.setItem('user', user);

            // Guardar token (SÍ sensible)
            await StorageService.saveToken('authToken', fakeToken);

            Alert.alert('Éxito', 'Cuenta creada correctamente', [
                {
                    text: 'Ir al Login',
                    onPress: () => router.replace('/')
                }
            ]);

        } catch (error) {
            Alert.alert('Error', 'No se pudo registrar');
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        handleRegister
    };
};