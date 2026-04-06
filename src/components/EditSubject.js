import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useEditSubject } from "../hooks/useEditSubject";
import { styles } from "../styles/editAddStyle";

const EditSubjectScreen = () => {
  const { subject, setSubject, professors, onSave,} = useEditSubject();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit subject</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Subject name</Text>
        <TextInput
          value={subject.name}
          onChangeText={(text) => setSubject({ ...subject, name: text })}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Teacher</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => setOpen(!open)}
        >
          <View style={styles.selectRow}>
            <Text style={subject.teacher ? styles.selectText : styles.placeholder}>
              {subject.teacher || "Select a teacher"}
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
                  setSubject({ ...subject, teacher: prof.name });
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
          title="Save subject"
          //onPress={handleLogin}
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