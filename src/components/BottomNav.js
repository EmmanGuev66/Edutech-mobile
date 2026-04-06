import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/globalStyle";

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