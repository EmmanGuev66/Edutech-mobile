import { router } from "expo-router";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useSearchSubject } from "../hooks/useSearchSubject";
import { styles } from "../styles/globalStyle";

const searchSubjectScreen = () => {
  const { subjects } = useSearchSubject();

  return (
    <View style={styles.containerList}>

      <Text style={styles.title}>Subjects</Text>

      <View style={[styles.inputContainer, styles.inputNoGlow, { marginBottom: 16 }]}>
        <Image
          source={require("../../assets/images/search.png")}
          style={{ width: 18, height: 18, marginRight: 8 }}
        />
        <TextInput
          placeholder="Search subject"
          placeholderTextColor="#aaa"
          style={styles.inputText}
        />
      </View>

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.listCard}>
            <Image source={{ uri: item.image }} style={styles.avatar} />

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.name}>{item.name}</Text>
            </View>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => router.push("/viewSubject")}
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/addSubject")}
      >
        <Image
          source={require("../../assets/images/add.png")}
          style={styles.fabImage}
        />
      </TouchableOpacity>

      <BottomNav
        current="searchSubject"
        navigateTo={(route) => router.push(route)}
      />

    </View>
  );
};

export default searchSubjectScreen;