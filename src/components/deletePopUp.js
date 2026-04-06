import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import warningIcon from "../../assets/images/advertencia.png";

export const ConfirmDelete = ({
  visible,
  onCancel,
  onConfirm,
  title = "Delete item?",
  description = "Are you sure you want to delete this item?",
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>

          <Image source={warningIcon} style={styles.icon} />

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.buttonRow}>
            
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={onConfirm}>
              <LinearGradient
                colors={["#ef4444", "#f87171"]}
                style={styles.gradient}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8b5cf6",
  },

  icon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 12,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },

  description: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#8b5cf6",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  cancelText: {
    color: "#fff",
    fontWeight: "bold",
  },

  deleteBtn: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  gradient: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});