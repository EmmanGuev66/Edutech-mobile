import { useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useAddProfessor } from "../hooks/useAddProfessor";
import { styles } from "../styles/editAddStyle";

const AddProfessorScreen = () => {
  const { professor, setProfessor, onSave, navigateTo } = useAddProfessor();
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
          placeholder="Enter ID"
          placeholderTextColor="#aaa"
          value={professor.id}
          onChangeText={(text) => setProfessor({ ...professor, id: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Full name</Text>
        <TextInput
          placeholder="Enter name"
          placeholderTextColor="#aaa"
          value={professor.name}
          onChangeText={(text) => setProfessor({ ...professor, name: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#aaa"
          value={professor.email}
          onChangeText={(text) => setProfessor({ ...professor, email: text })}
          style={styles.input}
        />

      </View>

      <GradientButton
        title="Save professor"
        onPress={onSave}
        style={styles.primaryButton}
      />

      <BottomNav
        current="searchProfessor"
        navigateTo={navigateTo}
      />
    </View>
  );
};

export default AddProfessorScreen;