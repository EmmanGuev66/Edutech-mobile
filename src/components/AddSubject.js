import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useAddSubject } from "../hooks/useAddSubject";
import { styles } from "../styles/editAddStyle";

const AddSubjectScreen = () => {
  const { subject, setSubject, professors, onSave, loading, errors } = useAddSubject();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add subject</Text>

      <View style={styles.card}>

        <Text style={styles.label}>ID</Text>
        <TextInput
          value={subject.id ? `MAT${subject.id}` : ""}
          onChangeText={(text) => {
            const numeric = text.replace(/[^0-9]/g, "");
            setSubject({ ...subject, id: numeric });
          }}
          style={[
            styles.input,
            errors.id && { borderColor: "red" }
          ]}
          placeholder="101"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        {errors.id && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.id}
          </Text>
        )}

        <Text style={styles.label}>Subject name</Text>
        <TextInput
          value={subject.name}
          onChangeText={(text) =>
            setSubject({ ...subject, name: text })
          }
          style={[
            styles.input,
            errors.name && { borderColor: "red" }
          ]}
          placeholder="Math"
          placeholderTextColor="#aaa"
        />

        {errors.name && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            {errors.name}
          </Text>
        )}

        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          value={subject.photo}
          onChangeText={(text) =>
            setSubject({ ...subject, photo: text })
          }
          style={styles.input}
          placeholder="https://i.imgur.com/6ZuE4oQ.png"
          placeholderTextColor="#aaa"
        />

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
              {
                subject.teacher
                  ? professors.find(p => p.id === subject.teacher)?.name
                  : "Select a teacher"
              }
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
      />

      <BottomNav
        current="searchSubject"
        navigateTo={(route) => router.push(route)}
      />
    </View>
  );
};

export default AddSubjectScreen;