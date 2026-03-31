import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLogin } from "../hooks/useLogin";

const LoginScreen = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Avatar / Logo */}
      <View style={styles.avatar} />

      {/* Línea decorativa */}
      <View style={styles.line} />

      {/* Card */}
      <View style={styles.card}>
        
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>

      {/* Registro */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    marginBottom: 20,
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
    gap: 15,
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