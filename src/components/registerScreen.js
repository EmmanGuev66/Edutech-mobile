import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GradientButton } from "../components/GradientButton";
import { useRegister } from '../hooks/useRegister';
import { styles } from "../styles/globalStyle";

const RegisterScreen = () => {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleRegister,
    loading,
    errors
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

          <View style={styles.card}>

            <Text style={styles.cardTitle}>Create Account</Text>

            {/* NAME */}
            <View style={[
              styles.inputContainer,
              styles.inputNoGlow,
              errors.name && { borderColor: "red" }
            ]}>
              <Image
                source={require("../../assets/images/user.png")}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
                style={styles.inputText}
              />
            </View>

            {errors.name && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.name}
              </Text>
            )}

            {/* EMAIL */}
            <View style={[
              styles.inputContainer,
              styles.inputNoGlow,
              errors.email && { borderColor: "red" }
            ]}>
              <Image
                source={require("../../assets/images/email.png")}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="ad1234@school.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.inputText}
              />
            </View>

            {errors.email && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.email}
              </Text>
            )}

            {/* PASSWORD */}
            <View style={[
              styles.inputContainer,
              styles.inputNoGlow,
              errors.password && { borderColor: "red" }
            ]}>
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
                style={styles.inputText}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={{ color: "#007AFF", marginLeft: 10 }}>
                  {showPassword ? "Hide" : "View"}
                </Text>
              </TouchableOpacity>
            </View>

            {errors.password && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.password}
              </Text>
            )}

            {/* CONFIRM PASSWORD */}
            <View style={[
              styles.inputContainer,
              styles.inputNoGlow,
              errors.confirmPassword && { borderColor: "red" }
            ]}>
              <Image
                source={require("../../assets/images/lock.png")}
                style={styles.inputIcon}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                style={styles.inputText}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Text style={{ color: "#007AFF", marginLeft: 10 }}>
                  {showConfirm ? "Hide" : "View"}
                </Text>
              </TouchableOpacity>
            </View>

            {errors.confirmPassword && (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {errors.confirmPassword}
              </Text>
            )}

            <GradientButton
              title={loading ? "Creating..." : "Create Account"}
              onPress={handleRegister}
              style={styles.primaryButton}
            />

          </View>

          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkHighlight}>Sign in</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;