import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },

  title: {
    color: "#c084fc",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#4f5dff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: "#5e6bfd",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    marginVertical: 6,
  },


  placeholder: {
    color: "#aaa",
  },

  saveBtn: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },

  deleteBtn: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
  },

  subjectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  subjectChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#5e6bfd",
  },

  subjectChipActive: {
    backgroundColor: "#8b5cf6",
  },

  subjectText: {
    color: "#ccc",
    fontSize: 12,
  },

  subjectTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  primaryButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },

  gradientButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: 12,
  },

  select: {
    backgroundColor: "#5e6bfd",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
  },

  selectText: {
    color: "#fff",
  },

  placeholder: {
    color: "#aaa",
  },

  dropdown: {
    backgroundColor: "#8c6cd6a6",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#4f5dff",
  },

  dropdownText: {
    color: "#fff",
  },

  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  arrow: {
    color: "#fff",
    fontSize: 14,
  },
});