import { useRouter } from "expo-router";
import { useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddProfessor = () => {
  const router = useRouter();

  const [professor, setProfessor] = useState({
    id: "",
    name: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    name: ""
  });

  const onSave = async () => {
    setErrors({ id: "", name: "" });

    if (!professor.id.trim()) {
      setErrors({ id: "ID is required", name: "" });
      return;
    }

    if (!/^[0-9]+$/.test(professor.id)) {
      setErrors({ id: "Only numbers allowed", name: "" });
      return;
    }

    if (!professor.name.trim()) {
      setErrors({ id: "", name: "Name is required" });
      return;
    }

    if (/[0-9]/.test(professor.name)) {
      setErrors({ id: "", name: "Name cannot contain numbers" });
      return;
    }

    try {
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
        setErrors({ id: "This ID already exists", name: "" });
        return;
      }

      const generatedEmail = `th${professor.id}@school.com`;

      const photo = professor.avatar?.trim()
        ? professor.avatar
        : "https://i.imgur.com/kzfWiow.png";

      await api.post(
        "/createTeacher",
        {
          ID: professor.id,
          Name: professor.name,
          Email: generatedEmail,
          Photo: photo,
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
      setErrors({ id: "Could not create professor", name: "" });
    }
  };

  const navigateTo = (route) => {
    router.push(route);
  };

  return {
    professor,
    setProfessor,
    onSave,
    navigateTo,
    errors
  };
};