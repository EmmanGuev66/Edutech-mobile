import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        // Validaciones básicas de mockup
        if (name === '' || email === '' || password === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Error', 'Email no válido');
            return;
        }

        // Simulación de éxito
        Alert.alert('Éxito', 'Cuenta creada correctamente', [
            { text: 'Ir al Login', onPress: () => router.replace('/') }
        ]);
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        handleRegister
    };
};