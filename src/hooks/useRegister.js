import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        if (!email.startsWith("ad")) {
            Alert.alert(
                'Invalid role',
                'Only admin accounts are allowed.\n\nUse format:\nad1234@school.com'
            );
            return;
        }

        if (!StorageService.validate('email', email)) {
            Alert.alert(
                'Invalid email',
                'You must register as admin using this format:\n\nadID@school.com\n\nExample: ad1234@school.com'
            );
            return;
        }

        if (!StorageService.validate('password', password)) {
            Alert.alert(
                'Error',
                'Password must be at least 8 characters long and include uppercase, lowercase, and a number'
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/signup", {
                Name: name.trim(),
                Email: email.trim(),
                Password: password
            });

            Alert.alert('Success', 'Admin account created successfully', [
                {
                    text: 'Go to login',
                    onPress: () => router.replace('/')
                }
            ]);

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Registration failed';

            Alert.alert('Error', message);

        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        handleRegister,
        loading
    };
};