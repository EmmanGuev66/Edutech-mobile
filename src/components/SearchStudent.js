import { router } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSearchStudent } from "../hooks/useSearchStudent";

const searchStudentScreen = () => {
  const { students } = useSearchStudent();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TextInput
        placeholder="Search student"
        placeholderTextColor="#aaa"
        style={styles.input}
      />

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>

            <TouchableOpacity style={styles.editBtn} onPress={() => router.push("/editStudent")}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ gap: 12 }}
      />

      <TouchableOpacity style={styles.fab}>
        <Text style={{ color: "#fff", fontSize: 24 }} onPress={() => router.push("/addStudent")}>+</Text>
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
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#1e1e2f",
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f5dff",
    padding: 12,
    borderRadius: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
  },
  email: {
    color: "#ddd",
    fontSize: 12,
  },
  editBtn: {
    backgroundColor: "#a855f7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editText: {
    color: "#fff",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#a855f7",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default searchStudentScreen;