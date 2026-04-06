import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },

  header: {
    color: "#c084fc",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#4f5dff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  email: {
    color: "#ddd",
    fontSize: 12,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },

  infoBox: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold',
  },

  subjectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  subjectChipActive: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#8b5cf6",
  },

  subjectTextActive: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  primaryButton: {
    flex: 1,
    marginRight: 8,
  },

  gradientButton: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  deleteBtn: {
    flex: 1,
    height: 48,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
  },

  mainCard: {
    backgroundColor: "#171e2e",
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconSmall: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  iconButton: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
});