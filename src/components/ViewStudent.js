import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
import idIcon from "../../assets/images/id.png";
import subjectIcon from "../../assets/images/subject2.png";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useViewStudent } from "../hooks/useViewStudent";
import { styles } from "../styles/viewStyle";
import { ConfirmDelete } from "./deletePopUp";

const ViewStudent = () => {
  const { student, onDelete } = useViewStudent();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Student's Information</Text>
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Loading...
        </Text>
      </View>
    );
  }

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
            {student.subjects?.length > 0 ? (
              student.subjects.map((subj, index) => (
                <View key={index} style={styles.subjectChipActive}>
                  <Text style={styles.subjectTextActive}>{subj}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.label}>No subjects</Text>
            )}
          </View>
        </View>

        <View style={styles.buttonRow}>

          <GradientButton
            title="Edit student"
            icon={editIcon}
            onPress={() =>
              router.push({
                pathname: "/editStudent",
                params: { id: student.id }
              })
            }
            style={styles.primaryButton}
          />

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

      <BottomNav
        current="searchStudent"
        navigateTo={(route) => router.push(route)}
      />
    </View>
  );
};

export default ViewStudent;