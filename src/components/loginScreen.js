import { useRouter } from "expo-router"; // 1. IMPORTAR
import { Button, TextInput, View } from 'react-native';
import { useLogin } from '../hooks/useLogin';

const LoginScreen = () => {
    // Le pasamos el objeto navigation al hook
    const { email, setEmail, password, setPassword, handleLogin } = useLogin();
    const router = useRouter(); // 2. DEFINIR EL ROUTER AQUÍ

    return (
        <View>
            <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
            />
            <TextInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Button 
                title="¿No tienes cuenta? Regístrate" 
                onPress={() => router.push('/register')} 
                color="gray"
            />
        </View>
    );
}
export default LoginScreen;