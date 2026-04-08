import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useEditStudent } from "../hooks/useEditStudent";
import { styles } from "../styles/editAddStyle";

const EditStudentScreen = () => {
  const { 
    student, 
    setStudent,
    subjects, 
    selectedSubjects, 
    toggleSubject, 
    navigateTo,
    onSave
  } = useEditStudent();

  const normalize = (text) => String(text).trim().toLowerCase();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Edit student</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          value={student.avatar}
          onChangeText={(text) => setStudent({ ...student, avatar: text })}
          placeholder="https://..."
          placeholderTextColor="#888"
          style={styles.input}
        />

        <Text style={styles.label}>Full name</Text>
        <TextInput
          value={student.name}
          onChangeText={(text) => setStudent({ ...student, name: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Subjects</Text>

        <View style={styles.subjectContainer}>
          {subjects?.length > 0 ? (
            subjects.map((subj) => {
              const isSelected = selectedSubjects.find(
                (s) => normalize(s) === normalize(subj)
              );

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
            })
          ) : (
            <Text style={styles.label}>No subjects available</Text>
          )}
        </View>

      </View>

      <GradientButton
        title="Save student"
        onPress={onSave}
        style={styles.primaryButton}
      />

      <BottomNav 
        current="searchStudent" 
        navigateTo={navigateTo} 
      />

    </View>
  );
};

export default EditStudentScreen;