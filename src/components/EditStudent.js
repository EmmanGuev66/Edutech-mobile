import { LinearGradient } from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
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

      {/* SAVE */}
      <TouchableOpacity style={styles.primaryButton}>
        <LinearGradient
          colors={["#3b82f6", "#8b5cf6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.saveText}>Save student</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      

      {/* NAVBAR */}
      <BottomNav current="searchStudent" navigateTo={navigateTo} />

    </View>
  );
};

export default EditStudentScreen;