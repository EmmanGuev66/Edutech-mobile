import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddProfessor = () => {
  const router = useRouter();

  const [professor, setProfessor] = useState({
    id: "",
    name: "",
    avatar: "",
  });

  const onSave = async () => {
    try {
      if (!professor.id) {
        Alert.alert("Error", "ID is required");
        return;
      }

      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get("/getAllTeachers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = response.data;

      if (Array.isArray(data)) {
      } else if (Array.isArray(data.teachers)) {
        data = data.teachers;
      } else if (Array.isArray(data.data)) {
        data = data.data;
      } else {
        data = [];
      }

      const exists = data.some(
        (t) => String(t.ID || t.id) === String(professor.id)
      );

      if (exists) {
        Alert.alert("Duplicate ID", "This professor ID already exists");
        return;
      }

      const generatedEmail = `th${professor.id}@school.com`;

      await api.post(
        "/createTeacher",
        {
          ID: professor.id,
          Name: professor.name,
          Email: generatedEmail,
          Photo: professor.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Alert.alert("Success", "Professor created");

      router.replace("/searchProfessor");

    } catch (error) {
      console.log("Error creating professor:", error?.response?.data || error);
      Alert.alert("Error", "Could not create professor");
    }
  };

  const navigateTo = (route) => {
    router.push(route);
  };

  return {
    professor,
    setProfessor,
    onSave,
    navigateTo
  };
};