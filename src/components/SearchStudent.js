import { router } from "expo-router";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useSearchStudent } from "../hooks/useSearchStudent";
import { styles } from "../styles/globalStyle";

const searchStudentScreen = () => {
  const { students } = useSearchStudent();

  return (
    <View style={styles.containerList}>

      {/* Title */}
      <Text style={styles.title}>Students</Text>

      <View style={[styles.inputContainer, styles.inputNoGlow, { marginBottom: 16 }]}>
        <Image
          source={require("../../assets/images/search.png")}
          style={{ width: 18, height: 18, marginRight: 8 }}
        />
        <TextInput
          placeholder="Search student"
          placeholderTextColor="#aaa"
          style={styles.inputText}
        />
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.listCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>

            <TouchableOpacity style={styles.viewBtn} onPress={() => router.push("/viewStudent")}>
                <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/addStudent")}
      >
        <Image
          source={require("../../assets/images/add.png")}
          style={styles.fabImage}
        />
      </TouchableOpacity>

      {/*  Navbar */}
      <BottomNav
        current="searchStudent"
        navigateTo={(route) => router.push(route)}
      />

    </View>
  );
};

export default searchStudentScreen;