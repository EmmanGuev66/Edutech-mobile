import { Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
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
    onSave
  } = useAddStudent();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add student</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Photo URL</Text>
        <TextInput
          placeholder="https://i.imgur.com/kzfWiow.png"
          placeholderTextColor="#888"
          value={student.avatar}
          onChangeText={(text) => setStudent({ ...student, avatar: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Full name</Text>
        <TextInput
          placeholder="Enter name"
          placeholderTextColor="#888"
          value={student.name}
          onChangeText={(text) => {
            const noNumbers = text.replace(/[0-9]/g, "");

            if (text !== noNumbers) {
              alert("Name cannot contain numbers");
            }

            setStudent({ ...student, name: noNumbers });
          }}
          style={styles.input}
        />

        <Text style={styles.label}>ID</Text>
        <TextInput
          placeholder="Enter ID"
          placeholderTextColor="#888"
          value={student.id}
          onChangeText={(text) => {
            const numeric = text.replace(/[^0-9]/g, "");

            if (text !== numeric) {
              alert("Only numbers allowed");
            }

            setStudent({ ...student, id: numeric });
          }}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Subjects</Text>

        <View style={styles.subjectContainer}>
          {subjects?.length > 0 ? (
            subjects.map((subj) => {
              const isSelected = selectedSubjects.includes(subj);

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

      <BottomNav current="searchStudent" navigateTo={navigateTo} />
    </View>
  );
};

export default AddStudentScreen;