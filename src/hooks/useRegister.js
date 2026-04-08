import { useRouter } from "expo-router";
import { useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const router = useRouter();

    const handleRegister = async () => {

        setErrors({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrors({
                name: !name ? "Name is required" : "",
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : "",
                confirmPassword: !confirmPassword ? "Confirm your password" : ""
            });
            return;
        }

        if (/\d/.test(name)) {
            setErrors(prev => ({
                ...prev,
                name: "Name cannot contain numbers"
            }));
            return;
        }

        if (!email.startsWith("ad")) {
            setErrors(prev => ({
                ...prev,
                email: "Use admin format: ad1234@school.com"
            }));
            return;
        }

        if (!StorageService.validate('email', email)) {
            setErrors(prev => ({
                ...prev,
                email: "Invalid email format"
            }));
            return;
        }

        if (!StorageService.validate('password', password)) {
            setErrors(prev => ({
                ...prev,
                password: "Min 8 chars, uppercase, lowercase, number"
            }));
            return;
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: "Passwords do not match"
            }));
            return;
        }

        try {
            setLoading(true);

            await api.post("/auth/signup", {
                Name: name.trim(),
                Email: email.trim(),
                Password: password
            });

            router.replace("/");

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                '';

            if (message.toLowerCase().includes('exist')) {
                setErrors(prev => ({
                    ...prev,
                    email: "Account already exists"
                }));
            } else {
                setErrors(prev => ({
                    ...prev,
                    email: message || "Account already exists"
                }));
            }

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
        loading,
        errors
    };
};