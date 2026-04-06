import { useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GradientButton } from "../components/GradientButton";
import { useLogin } from "../hooks/useLogin";
import { styles } from "../styles/globalStyle";

const LoginScreen = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome!</Text>

      {/* Card */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>Sign in</Text>

        {/* Email */}
        <View style={[styles.inputContainer, styles.inputGlow]}>
          <Image
            source={require("../../assets/images/email.png")}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={styles.inputText}
          />
        </View>

        {/* Password */}
        <View style={[styles.inputContainer, styles.inputGlow]}>
          <Image
            source={require("../../assets/images/lock.png")}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.inputText}
          />
        </View>

        <GradientButton
          title="Sign in"
          onPress={handleLogin}
          style={styles.primaryButton}
        />

      </View>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.linkText}>
          Don't have an account?{" "}
          <Text style={styles.linkHighlight}>Sign up</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default LoginScreen;

