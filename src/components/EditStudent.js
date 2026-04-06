import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useEditStudent } from "../hooks/useEditStudent";
import { styles } from "../styles/editAddStyle";

const EditStudentScreen = () => {
  const { student, subjects, selectedSubjects, toggleSubject, navigateTo } = useEditStudent();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Edit student</Text>

      {/* Card */}
      <View style={styles.card}>

        {/* Photo URL */}
        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          value={student.avatar}
          placeholder="https://..."
          placeholderTextColor="#888"
          style={styles.input}
        />

        {/* Name */}
        <Text style={styles.label}>Full name</Text>
        <TextInput value={student.name} style={styles.input} />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput value={student.email} style={styles.input} />

        {/* SUBJECT */}
        <Text style={styles.label}>Subjects</Text>

        <View style={styles.subjectContainer}>
          {subjects.map((subj) => {
            const isSelected = selectedSubjects.includes(subj);

            return (
              <TouchableOpacity
                key={subj}
                style={[
                  styles.subjectChip,
                  isSelected && styles.subjectChipActive
                ]}
                onPress={() => toggleSubject(subj)}
              >
                <Text
                  style={[
                    styles.subjectText,
                    isSelected && styles.subjectTextActive
                  ]}
                >
                  {subj}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

      <GradientButton
          title="Save student"
          //onPress={handleLogin}
          style={styles.primaryButton}
      />

      {/* NAVBAR */}
      <BottomNav current="searchStudent" navigateTo={navigateTo} />

    </View>
  );
};

export default EditStudentScreen;