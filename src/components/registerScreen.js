import { Button, Text, TextInput, View } from 'react-native';
import { useRegister } from '../hooks/useRegister';

const RegisterScreen = () => {
    const { name, setName, email, setEmail, password, setPassword, handleRegister } = useRegister();

    return (
        <View>
            <Text>Pantalla de Registro</Text>
            
            <TextInput 
                placeholder="Nombre Completo" 
                value={name} 
                onChangeText={setName} 
            />
            <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
            />
            <TextInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />

            <Button title="Crear Cuenta" onPress={handleRegister} />
        </View>
    );
};

export default RegisterScreen;