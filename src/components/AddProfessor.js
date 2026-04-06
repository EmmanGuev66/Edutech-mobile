import { useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useAddProfessor } from "../hooks/useAddProfessor";
import { styles } from "../styles/editAddStyle";

const AddProfessorScreen = () => {
  const { professor, setProfessor, onSave } = useAddProfessor();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add professor</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          placeholder="https://..."
          placeholderTextColor="#aaa"
          value={professor.avatar}
          onChangeText={(text) => setProfessor({ ...professor, avatar: text })}
          style={styles.input}
        />

        <Text style={styles.label}>ID</Text>
        <TextInput
          value={professor.id}
          onChangeText={(text) => setProfessor({ ...professor, id: text })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Full name</Text>
        <TextInput
          value={professor.name}
          onChangeText={(text) => setProfessor({ ...professor, name: text })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={professor.email}
          onChangeText={(text) => setProfessor({ ...professor, email: text })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

      </View>

      <GradientButton
          title="Save professor"
          //onPress={handleLogin}
          style={styles.primaryButton}
      />

      <BottomNav
        current="searchProfessor"
        navigateTo={(route) => router.push(route)}
      />
    </View>
  );
};

export default AddProfessorScreen;