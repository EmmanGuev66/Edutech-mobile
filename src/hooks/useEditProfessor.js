import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useEditProfessor = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [professor, setProfessor] = useState({
    name: "",
    photo: "",
  });

  const fetchProfessor = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const res = await api.get(`/getTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = res.data;
      if (data.data) data = data.data;

      setProfessor({
        name: data.Name || "",
        photo: data.Photo || "",
      });

    } catch (error) {
      console.log("Error fetching professor:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    if (!professor.name?.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.put(
        `/updateTeacher/${id}`,
        {
          Name: professor.name,
          Photo: professor.photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.replace({
        pathname: "/viewProfessor",
        params: { id }
      });

    } catch (error) {
      console.log("Error updating professor:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    if (id) fetchProfessor();
  }, [id]);

  return {
    professor,
    setProfessor,
    onSave,
  };
};