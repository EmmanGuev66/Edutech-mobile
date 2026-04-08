import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useEditSubject } from "../hooks/useEditSubject";
import { styles } from "../styles/editAddStyle";

const EditSubjectScreen = () => {
  const { subject, setSubject, professors, onSave, loading, errors } = useEditSubject();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const selectedTeacher = professors.find(
    (p) => p.id === String(subject.teacher)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit subject</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Subject name</Text>
        <TextInput
          value={subject.name}
          onChangeText={(text) =>
            setSubject(prev => ({ ...prev, name: text }))
          }
          style={[
            styles.input,
            errors.name && { borderColor: "red" }
          ]}
        />

        {errors.name && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.name}
          </Text>
        )}

        <Text style={styles.label}>Teacher</Text>

        <TouchableOpacity
          style={[
            styles.select,
            errors.teacher && { borderColor: "red" }
          ]}
          onPress={() => setOpen(!open)}
        >
          <View style={styles.selectRow}>
            <Text style={subject.teacher ? styles.selectText : styles.placeholder}>
              {selectedTeacher?.name || "Select a teacher"}
            </Text>
            <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
          </View>
        </TouchableOpacity>

        {errors.teacher && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.teacher}
          </Text>
        )}

        {open && (
          <View style={styles.dropdown}>
            {professors.map((prof) => (
              <TouchableOpacity
                key={prof.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSubject(prev => ({
                    ...prev,
                    teacher: prof.id
                  }));
                  setOpen(false);
                }}
              >
                <Text style={styles.dropdownText}>
                  {prof.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <GradientButton
        title={loading ? "Saving..." : "Save subject"}
        onPress={onSave}
        style={styles.primaryButton}
      />

      <BottomNav
        current="searchSubject"
        navigateTo={(route) => router.push(route)}
      />
    </View>
  );
};

export default EditSubjectScreen;