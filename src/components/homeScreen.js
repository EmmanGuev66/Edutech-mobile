import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useHome } from "../hooks/useHome";
import { styles } from "../styles/globalStyle";

const HomeScreen = () => {
  const { stats, activities, navigateTo } = useHome();

  return (
    <View style={styles.container}>

      {/* Header */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>EduTech Connect</Text>
      <Text style={styles.subtitle}>School Management System</Text>

      {/* Stats */}
      <View style={styles.statsRow}>

        {/* Students */}
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

        {/* Professors */}
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

        {/* Subjects */}
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

      {/* Activities */}
      <Text style={styles.sectionTitle}>Recent Activities</Text>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        {activities.map((act) => (
          <View key={act.id} style={styles.activityCard}>
            <Text style={styles.activityTitle}>{act.title}</Text>
            <Text style={styles.activityDetail}>{act.detail}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Navbar */}
      <BottomNav current="home" navigateTo={navigateTo} />

    </View>
  );
};

export default HomeScreen;