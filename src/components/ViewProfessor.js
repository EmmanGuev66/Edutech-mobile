import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
import idIcon from "../../assets/images/id.png";
import subjectIcon from "../../assets/images/subject2.png";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useViewProfessor } from "../hooks/useViewProfessor";
import { styles } from "../styles/viewStyle";
import { ConfirmDelete } from "./deletePopUp";

export const ViewProfessor = () => {
  const { professor, onDelete } = useViewProfessor();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Professor's Information</Text>

      <View style={styles.mainCard}>
        
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={{ uri: professor.avatar }} style={styles.avatar} />

            <View>
              <Text style={styles.name}>{professor.name}</Text>
              <Text style={styles.email}>{professor.email}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Professor information</Text>

        <View style={styles.infoBox}>
            <View style={styles.row}>
                <Image source={idIcon} style={styles.iconSmall} />
                <Text style={styles.label}>ID: {professor.id}</Text>
            </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.row}>
             <Image source={subjectIcon} style={styles.iconSmall} />
             <Text style={styles.label}>Subjects:</Text>
          </View>

          <View style={styles.subjectContainer}>
            {professor.subjects.map((subj, index) => (
              <View key={index} style={styles.subjectChipActive}>
                <Text style={styles.subjectTextActive}>{subj}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonRow}>

          <GradientButton
            title="Edit student"
            icon={editIcon}
            onPress={() => router.push("/editProfessor")}
            style={styles.primaryButton}
          />

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setShowModal(true)}
          >
            <View style={styles.buttonContent}>
                <Image source={deleteIcon} style={styles.iconButton} />
                <Text style={[styles.deleteText, { fontSize: 13 }]}>Delete professor</Text>
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
        title="Delete professor?"
        description={`Are you sure you want to delete ${professor.name}?`}
      />

        <BottomNav current="searchProfessor" navigateTo={(route) => router.push(route)}/>

    </View>
  );
};