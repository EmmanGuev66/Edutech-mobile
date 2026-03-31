import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRegister } from '../hooks/useRegister';

const RegisterScreen = () => {
    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        handleRegister
    } = useRegister();

    const router = useRouter();

    return (
        <View style={styles.container}>

            {/* Avatar */}
            <View style={styles.avatar} />

            {/* Línea */}
            <View style={styles.line} />

            {/* Card */}
            <View style={styles.card}>

                <TextInput
                    placeholder="Nombre Completo"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TextInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>

            </View>

            {/* Volver a login */}
            <TouchableOpacity onPress={() => router.replace('/')}>
                <Text style={styles.registerText}>
                    ¿Ya tienes cuenta? Inicia sesión
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ccc",
    marginBottom: 15,
  },

  line: {
    width: 120,
    height: 2,
    backgroundColor: "#aaa",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },

  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 12,
  },

  button: {
    backgroundColor: "#bbb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    fontWeight: "bold",
  },

  registerText: {
    marginTop: 20,
    color: "#555",
  },
});