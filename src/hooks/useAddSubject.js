import { useEffect, useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddSubject = () => {
  const [subject, setSubject] = useState({
    id: "",
    name: "",
    teacher: "",
    photo: ""
  });

  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfessors = async () => {
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
        throw new Error("Unexpected response");
      }

      const mapped = data.map((item) => ({
        id: item.ID || item.id,
        name: item.Name || item.name
      }));

      setProfessors(mapped);

    } catch (error) {
      console.log("ERROR TEACHERS:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    if (!subject.id || !subject.name || !subject.teacher) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);

      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.post("/createSubject", {
        ID: subject.id,
        Name: subject.name,
        Teacher: subject.teacher,
        Photo: subject.photo || "https://via.placeholder.com/150"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Alert.alert("Success", "Subject created");

      setSubject({
        id: "",
        name: "",
        teacher: "",
        photo: ""
      });

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Error creating subject";

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  return {
    subject,
    setSubject,
    professors,
    onSave,
    loading
  };
};