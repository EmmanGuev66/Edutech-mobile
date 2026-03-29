import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEditStudent } from "../hooks/useEditStudent";

const EditStudentScreen = () => {
  const { student } = useEditStudent();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit student</Text>

      <View style={styles.card}>
        {/* Full Name */}
        <Text style={styles.label}>Full name</Text>
        <TextInput
          value={student.name}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        {/* Age (fake dropdown) */}
        <Text style={styles.label}>Age</Text>
        <TouchableOpacity style={styles.select}>
          <Text style={styles.selectText}>{student.age}</Text>
        </TouchableOpacity>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={student.email}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        {/* Subject (fake dropdown) */}
        <Text style={styles.label}>Subject</Text>
        <TouchableOpacity style={styles.select}>
          <Text style={styles.placeholder}>Select subject</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete student</Text>
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
    marginBottom: 20,
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
    marginBottom: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
  },
});

export default EditStudentScreen;