import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const BottomNav = ({ current, navigateTo }) => {
  return (
    <View style={styles.navContainer}>

      <TouchableOpacity onPress={() => navigateTo("/home")}>
        <Image
          source={
            current === "home"
              ? require("../../assets/images/home-active.png")
              : require("../../assets/images/home.png")
          }
          style={styles.navIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo("/searchStudent")}>
        <Image
          source={
            current === "searchStudent"
              ? require("../../assets/images/student-active.png")
              : require("../../assets/images/student.png")
          }
          style={styles.navIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo("/searchProfessor")}>
        <Image
          source={
            current === "searchProfessor"
              ? require("../../assets/images/professor-active.png")
              : require("../../assets/images/user.png")
          }
          style={styles.navIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigateTo("/searchSubject")}>
        <Image
          source={
            current === "searchSubject"
              ? require("../../assets/images/subject-active.png")
              : require("../../assets/images/subject.png")
          }
          style={styles.navIcon}
        />
      </TouchableOpacity>

    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
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
});