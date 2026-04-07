import { useRouter } from "expo-router";
import { useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddProfessor = () => {
  const router = useRouter();

  const [professor, setProfessor] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  const onSave = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.post(
        "/createTeacher",
        {
          ID: professor.id,
          Name: professor.name,
          Email: professor.email,
          Photo: professor.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      router.replace("/searchProfessor");

    } catch (error) {
      console.log("Error creating professor:", error?.response?.data || error);
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