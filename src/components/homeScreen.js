import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useHome } from "../hooks/useHome";
import { styles } from "../styles/globalStyle";

const HomeScreen = () => {
  const { stats, navigateTo } = useHome();

  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>EduTech Connect</Text>
      <Text style={styles.subtitle}>School Management System</Text>

      <View style={styles.statsRow}>

        <TouchableOpacity
          onPress={() => navigateTo("/searchStudent")}
          style={{ flex: 1, marginHorizontal: 5 }}
        >
          <LinearGradient
            colors={["#3b82f6", "#8b5cf6"]}
            style={styles.statCardHome}
          >
            <Image
              source={require("../../assets/images/student-card.png")}
              style={styles.statImage}
            />
            <Text style={styles.statNumber}>{stats.students}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo("/searchProfessor")}
          style={{ flex: 1, marginHorizontal: 5 }}
        >
          <LinearGradient
            colors={["#3b82f6", "#8b5cf6"]}
            style={styles.statCard}
          >
            <Image
              source={require("../../assets/images/professor-card.png")}
              style={styles.statImage}
            />
            <Text style={styles.statNumber}>{stats.professors}</Text>
            <Text style={styles.statLabel}>Professors</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo("/searchSubject")}
          style={{ flex: 1, marginHorizontal: 5 }}
        >
          <LinearGradient
            colors={["#3b82f6", "#8b5cf6"]}
            style={styles.statCard}
          >
            <Image
              source={require("../../assets/images/subject-card.png")}
              style={styles.statImage}
            />
            <Text style={styles.statNumber}>{stats.subjects}</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>

      <BottomNav current="home" navigateTo={navigateTo} />

    </View>
  );
};

export default HomeScreen;