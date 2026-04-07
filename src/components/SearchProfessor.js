import { router } from "expo-router";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import BottomNav from "../components/BottomNav";
import { useSearchProfessor } from "../hooks/useSearchProfessor";
import { styles } from "../styles/globalStyle";

const SearchProfessorScreen = () => {
  const { professors, searchProfessor } = useSearchProfessor();

  return (
    <View style={styles.containerList}>

      <Text style={styles.title}>Professors</Text>

      <View style={[styles.inputContainer, styles.inputNoGlow, { marginBottom: 16 }]}>
        <Image
          source={require("../../assets/images/search.png")}
          style={{ width: 18, height: 18, marginRight: 8 }}
        />
        <TextInput
          placeholder="Search professor"
          placeholderTextColor="#aaa"
          style={styles.inputText}
          onChangeText={searchProfessor}
        />
      </View>

      <FlatList
        data={professors}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.listCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                router.push({
                  pathname: "/viewProfessor",
                  params: { id: item.id }
                })
              }
            >
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/addProfessor")}
      >
        <Image
          source={require("../../assets/images/add.png")}
          style={styles.fabImage}
        />
      </TouchableOpacity>

      <BottomNav
        current="searchProfessor"
        navigateTo={(route) => router.push(route)}
      />

    </View>
  );
};

export default SearchProfessorScreen;