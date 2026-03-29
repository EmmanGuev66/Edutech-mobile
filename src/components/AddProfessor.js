import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAddProfessor } from "../hooks/useAddProfessor";

const AddProfessorScreen = () => {
  const { professor } = useAddProfessor();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add professors</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          value={professor.id}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Full name</Text>
        <TextInput
          value={professor.name}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={professor.email}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={professor.password}
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />

      </View>


      {/* Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save professor</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    color: "#c084fc",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#3b4bff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    marginBottom: 4,
    fontSize: 12,
  },
  input: {
    backgroundColor: "#2a2a5a",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 12,
  },
  select: {
    backgroundColor: "#2a2a5a",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  selectText: {
    color: "#fff",
  },
  placeholder: {
    color: "#aaa",
  },
  saveBtn: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default AddProfessorScreen;