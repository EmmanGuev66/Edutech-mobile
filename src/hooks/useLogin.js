import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (!StorageService.validate("email", email)) {
            Alert.alert(
                "Error",
                "The type of the email must be ad1234@school.com"
            );
            return;
        }

        if (!StorageService.validate("password", password)) {
            Alert.alert(
                "Error",
                "The password must be 8 characters long and contain uppercase, lowercase, and numbers"
            );
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                Email: email.trim(),
                Password: password
            });

            const data = response.data;

            if (!data?.token) {
                throw new Error("Token not received");
            }

            await StorageService.saveToken(
                StorageService.KEYS.TOKEN,
                data.token
            );

            if (data.user) {
                await StorageService.saveUser(data.user);
            }

            router.replace("/home");

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Connection error";

            try {
                const cachedUser = await StorageService.getUser();

                if (cachedUser) {
                    Alert.alert("Offline mode", "Logging in with saved data", [
                        {
                            text: "OK",
                            onPress: () => router.replace("/home")
                        }
                    ]);
                    return;
                }
            } catch {}

            Alert.alert("Error", message);

        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        loading
    };
};