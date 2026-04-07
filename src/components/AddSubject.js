import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useAddSubject } from "../hooks/useAddSubject";
import { styles } from "../styles/editAddStyle";

const AddSubjectScreen = () => {
  const { subject, setSubject, professors, onSave, loading } = useAddSubject();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add subject</Text>

      <View style={styles.card}>
        <Text style={styles.label}>ID</Text>
        <TextInput
          value={subject.id}
          onChangeText={(text) => setSubject({ ...subject, id: text })}
          style={styles.input}
          placeholder="MAT101"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Subject name</Text>
        <TextInput
          value={subject.name}
          onChangeText={(text) => setSubject({ ...subject, name: text })}
          style={styles.input}
          placeholder="Math"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          value={subject.photo}
          onChangeText={(text) => setSubject({ ...subject, photo: text })}
          style={styles.input}
          placeholder="https://example.com/image.jpg"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Teacher</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => setOpen(!open)}
        >
          <View style={styles.selectRow}>
            <Text style={subject.teacher ? styles.selectText : styles.placeholder}>
              {
                subject.teacher
                  ? professors.find(p => p.id === subject.teacher)?.name
                  : "Select a teacher"
              }
            </Text>
            <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
          </View>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdown}>
            {professors.map((prof) => (
              <TouchableOpacity
                key={prof.id}
                style={styles.dropdownItem}
                onPress={() => {
                  setSubject({ ...subject, teacher: prof.id });
                  setOpen(false);
                }}
              >
                <Text style={styles.dropdownText}>{prof.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <GradientButton
        title={loading ? "Saving..." : "Save subject"}
        onPress={onSave}
        style={styles.primaryButton}
        disabled={!subject.teacher}
      />

      <BottomNav
        current="searchSubject"
        navigateTo={(route) => router.push(route)}
      />
    </View>
  );
};

export default AddSubjectScreen;