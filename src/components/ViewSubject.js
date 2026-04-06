import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import deleteIcon from "../../assets/images/delete.png";
import editIcon from "../../assets/images/edit.png";
import idIcon from "../../assets/images/id.png";
import BottomNav from "../components/BottomNav";
import { GradientButton } from "../components/GradientButton";
import { useViewSubject } from "../hooks/useViewSubject";
import { styles } from "../styles/viewStyle";
import { ConfirmDelete } from "./deletePopUp";

export const ViewSubject = () => {
  const { subject, onDelete } = useViewSubject();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  if (!subject) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Subjects Information</Text>

      <View style={styles.mainCard}>

        {/* SUBJECT CARD */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: subject.image,
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{subject.name}</Text>

              <Text style={styles.email}>
                 {subject.description}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Subject information</Text>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Image source={idIcon} style={styles.iconSmall} />
            <Text style={styles.label}>ID: {subject.id}</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Teacher:</Text>
          </View>

          <View style={styles.profileRow}>
            <Image
              source={{
                uri:
                  subject.teacher.avatar,
              }}
              style={[
                styles.avatar,
                { width: 40, height: 40, borderRadius: 20 },
              ]}
            />

            <View>
              <Text style={styles.name}>{subject.teacher.name}</Text>
              <Text style={styles.email}>{subject.teacher.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
        
            <GradientButton
                title="Edit subject"
                icon={editIcon}
                onPress={() => router.push("/editSubject")}
                style={styles.primaryButton}
            />
        
            <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => setShowModal(true)}
                  >
                <View style={styles.buttonContent}>
                    <Image source={deleteIcon} style={styles.iconButton} />
                    <Text style={styles.deleteText}>Delete subject</Text>
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
        title="Delete subject?"
        description={`Are you sure you want to delete ${subject.name}?`}
    />

    <BottomNav
        current="searchSubject"
        navigateTo={(route) => router.push(route)}
    />
</View>
  );
};