import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GradientButton } from "../components/GradientButton";
import { useLogin } from "../hooks/useLogin";
import { styles } from "../styles/globalStyle";

const LoginScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    loading
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome!</Text>

          <View style={styles.card}>

            <Text style={styles.cardTitle}>Sign in</Text>

            <View style={[styles.inputContainer, styles.inputGlow]}>
              <Image
                source={require("../../assets/images/email.png")}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="ad1234@school.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.inputText}
              />
            </View>

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
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                style={styles.inputText}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={{ color: "#007AFF", marginLeft: 10 }}>
                  {showPassword ? "Hide" : "View"}
                </Text>
              </TouchableOpacity>
            </View>

            <GradientButton
              title={loading ? "Loading..." : "Sign in"}
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
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;