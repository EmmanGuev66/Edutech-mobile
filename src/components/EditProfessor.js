import { useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useEditProfessor } from "../hooks/useEditProfessor";
import { styles } from "../styles/editAddStyle";

const EditProfessorScreen = () => {
  const { professor, setProfessor, onSave, errors } = useEditProfessor();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit professor</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          value={professor.name}
          onChangeText={(text) => setProfessor({ ...professor, name: text })}
          style={[
            styles.input,
            errors.name && { borderColor: "red" }
          ]}
          placeholder="Enter name"
          placeholderTextColor="#aaa"
        />

        {errors.name && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.name}
          </Text>
        )}

        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          value={professor.photo}
          onChangeText={(text) => setProfessor({ ...professor, photo: text })}
          style={styles.input}
          placeholder="https://..."
          placeholderTextColor="#aaa"
        />
      </View>

      <GradientButton
        title="Save professor"
        onPress={onSave}
        style={styles.primaryButton}
      />

      <BottomNav
        current="searchProfessor"
        navigateTo={(route) => router.push(route)}
      />
    </View>
  );
};

export default EditProfessorScreen;