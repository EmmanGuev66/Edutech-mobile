import { useRouter } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GradientButton } from "../components/GradientButton";
import { useRegister } from '../hooks/useRegister';
import { styles } from "../styles/globalStyle";

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

      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Card */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>Create Account</Text>

        {/* Name */}
        <View style={[styles.inputContainer, styles.inputNoGlow]}>
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

        {/* Email */}
        <View style={[styles.inputContainer, styles.inputNoGlow]}>
          <Image
            source={require("../../assets/images/email.png")}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.inputText}
          />
        </View>

        {/* Password */}
        <View style={[styles.inputContainer, styles.inputNoGlow]}>
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

        {/* Confirm Password */}
        <View style={[styles.inputContainer, styles.inputNoGlow]}>
          <Image
            source={require("../../assets/images/lock.png")}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.inputText}
          />
        </View>

        <GradientButton
          title="Create Account"
          onPress={handleRegister}
          style={styles.primaryButton}
        />

      </View>

      {/* Link */}
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.linkText}>
          Already have an account?{" "}
          <Text style={styles.linkHighlight}>Sign in</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default RegisterScreen;