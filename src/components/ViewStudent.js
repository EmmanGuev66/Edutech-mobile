import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
import idIcon from "../../assets/images/id.png";
import subjectIcon from "../../assets/images/subject2.png";
import { useViewStudent } from "../hooks/useViewStudent";
import { styles } from "../styles/viewStyle";
import { ConfirmDelete } from "./deletePopUp";

export const ViewStudent = () => {
  const { student, onDelete } = useViewStudent();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student's Information</Text>

      <View style={styles.mainCard}>
        
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={{ uri: student.avatar }} style={styles.avatar} />

            <View>
              <Text style={styles.name}>{student.name}</Text>
              <Text style={styles.email}>{student.email}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Student information</Text>

        <View style={styles.infoBox}>
            <View style={styles.row}>
                <Image source={idIcon} style={styles.iconSmall} />
                <Text style={styles.label}>ID: {student.id}</Text>
            </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.row}>
             <Image source={subjectIcon} style={styles.iconSmall} />
             <Text style={styles.label}>Subjects:</Text>
          </View>

          <View style={styles.subjectContainer}>
            {student.subjects.map((subj, index) => (
              <View key={index} style={styles.subjectChipActive}>
                <Text style={styles.subjectTextActive}>{subj}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/editStudent")}
          >
            <LinearGradient
              colors={["#3b82f6", "#8b5cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <View style={styles.buttonContent}>
                 <Image source={editIcon} style={styles.iconButton} />
                 <Text style={styles.primaryButtonText}>Edit student</Text>
                </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setShowModal(true)}
          >
            <View style={styles.buttonContent}>
                <Image source={deleteIcon} style={styles.iconButton} />
                <Text style={styles.deleteText}>Delete student</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmDelete
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete();
        }}
        title="Delete student?"
        description={`Are you sure you want to delete ${student.name}?`}
      />
    </View>
  );
};