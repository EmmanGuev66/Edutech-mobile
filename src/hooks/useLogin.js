import { useRouter } from "expo-router";
import { useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleLogin = async () => {
        setErrors({ email: "", password: "" });

        if (!email || !password) {
            setErrors({
                email: !email ? "Email is required" : "",
                password: !password ? "Password is required" : ""
            });
            return;
        }

        if (!StorageService.validate("email", email)) {
            setErrors({
                email: "Invalid email format (ad1234@school.com)",
                password: ""
            });
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

            const message = error?.response?.data?.msg || "";

            if (message.toLowerCase().includes("does not exist")) {
                setErrors({
                    email: "Email not found",
                    password: ""
                });
                return;
            }

            if (message.toLowerCase().includes("incorrect password")) {
                setErrors({
                    email: "",
                    password: "Incorrect password"
                });
                return;
            }

            setErrors({
                email: "",
                password: "Connection error"
            });

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
        loading,
        errors
    };
};