import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useAddStudent } from "../hooks/useAddStudent";
import { styles } from "../styles/editAddStyle";

const AddStudentScreen = () => {
  const {
    student,
    setStudent,
    subjects,
    selectedSubjects,
    toggleSubject,
    navigateTo,
  } = useAddStudent();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add student</Text>

      {/* CARD */}
      <View style={styles.card}>

        {/* Photo URL */}
        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          placeholder="https://..."
          placeholderTextColor="#888"
          value={student.avatar}
          onChangeText={(text) => setStudent({ ...student, avatar: text })}
          style={styles.input}
        />

        {/* NAME */}
        <Text style={styles.label}>Full name</Text>
        <TextInput
          placeholder="Enter name"
          placeholderTextColor="#888"
          value={student.name}
          onChangeText={(text) => setStudent({ ...student, name: text })}
          style={styles.input}
        />

        {/* ID */}
        <Text style={styles.label}>ID</Text>
        <TextInput
          placeholder="Enter ID"
          placeholderTextColor="#888"
          value={student.id}
          onChangeText={(text) => setStudent({ ...student, id: text })}
          style={styles.input}
        />

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
          placeholderTextColor="#888"
          value={student.email}
          onChangeText={(text) => setStudent({ ...student, email: text })}
          style={styles.input}
        />

        {/* SUBJECTS MULTI SELECT */}
        <Text style={styles.label}>Subjects</Text>

        <View style={styles.subjectContainer}>
          {subjects?.map((subj) => {
            const isSelected = selectedSubjects?.includes(subj);

            return (
              <TouchableOpacity
                key={subj}
                style={[
                  styles.subjectChip,
                  isSelected && styles.subjectChipActive,
                ]}
                onPress={() => toggleSubject(subj)}
              >
                <Text
                  style={[
                    styles.subjectText,
                    isSelected && styles.subjectTextActive,
                  ]}
                >
                  {subj}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

      {/* SAVE BUTTON (GRADIENT) */}
      <TouchableOpacity style={styles.primaryButton}>
        <LinearGradient
          colors={["#3b82f6", "#8b5cf6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.saveText}>Add student</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* NAVBAR */}
      <BottomNav current="student" navigateTo={navigateTo} />

    </View>
  );
};

export default AddStudentScreen;