import { useRouter } from "expo-router"; // <-- Importante
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Hook para navegar

    const handleLogin = () => {
        // Corrección del IF (usamos || porque si UNO está vacío, ya hay error)
        if(email.trim() === '' || password.trim() === ''){
            Alert.alert('Error', 'Los campos son obligatorios');
            return;
        }
        
        if(!email.includes('@')){
            Alert.alert('Error', 'Email no válido');
            return;
        }

        // Simulación
        Alert.alert('Éxito', 'Iniciando sesión...', [
            { text: 'OK', onPress: () => router.replace('/home') } // Navega a home.tsx
        ]);
    };

    return { email, setEmail, password, setPassword, handleLogin };
};