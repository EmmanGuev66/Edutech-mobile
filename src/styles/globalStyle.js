import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  logo: {
    width: 170,
    height: 170,
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#0b1220",
    borderRadius: 18,
    padding: 20,
    gap: 14,

    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },

  inputGlow: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#3b82f6",

    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 8,
  },

  inputNoGlow: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,

  },

  inputText: {
    flex: 1,
    color: "#fff",
  },

  primaryButton: {
    marginTop: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  gradientButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: 12,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  linkText: {
    marginTop: 20,
    color: "#aaa",
    fontSize: 12,
  },

  linkHighlight: {
    color: "#8b5cf6",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    },

  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#4f46e5",
  },

  statNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  statLabel: {
    color: "#ddd",
    fontSize: 12,
  },

  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },

  activityCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  activityTitle: {
    color: "#fff",
    fontWeight: "bold",
  },

  activityDetail: {
    color: "#aaa",
    fontSize: 12,
  },

  navContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: 24,
    backgroundColor: "#000",

    borderTopWidth: 1,
    borderColor: "#1e293b",
 },

  navIcon: {
    width: 35,
    height: 35,
  },

  statImage: {
    width: 90,
    height: 90,
    marginBottom: 6,
  },

  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f5dff",
    padding: 12,
    borderRadius: 14,
    minHeight: 70,
    width: "100%", 
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  name: {
    color: "#fff",
    fontWeight: "bold",
  },

  email: {
    color: "#ddd",
    fontSize: 12,
  },

  viewBtn: {
    backgroundColor: "#a855f7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    elevation: 4,
  },

  viewText: {
    color: "#fff",
    fontSize: 12,
  },

  fab: {
    position: "absolute",
    bottom: 90,
    right: 20,
  },

  fabImage: {
    width: 50,
    height: 50,
  },

  containerList: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  statCardHome: { 
    borderRadius: 14, 
    padding: 12, 
    alignItems: "center", 
 },
});