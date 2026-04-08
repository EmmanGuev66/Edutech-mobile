import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddSubject = () => {
  const router = useRouter();

  const [subject, setSubject] = useState({
    id: "",
    name: "",
    teacher: "",
    photo: ""
  });

  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfessors = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get("/getAllTeachers", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let data = response.data;

      if (Array.isArray(data)) {}
      else if (Array.isArray(data.teachers)) data = data.teachers;
      else if (Array.isArray(data.data)) data = data.data;
      else throw new Error("Unexpected response");

      const mapped = data.map((item) => ({
        id: item.ID || item.id,
        name: item.Name || item.name
      }));

      setProfessors(mapped);

    } catch (error) {
      console.log("ERROR TEACHERS:", error?.response?.data || error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const res = await api.get("/getAllSubjects", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let data = res.data;

      if (Array.isArray(data)) {}
      else if (Array.isArray(data.subjects)) data = data.subjects;
      else if (Array.isArray(data.data)) data = data.data;
      else throw new Error("Unexpected response");

      setSubjects(data);

    } catch (error) {
      console.log("ERROR SUBJECTS:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    if (!subject.id) {
      Alert.alert("Error", "ID is required");
      return;
    }

    if (!subject.name) {
      Alert.alert("Error", "Subject name is required");
      return;
    }

    if (!subject.teacher) {
      Alert.alert("Error", "Teacher is required");
      return;
    }

    const formattedId = `MAT${subject.id}`;

    const idExists = subjects.some(
      (s) => (s.ID || s.id) === formattedId
    );

    if (idExists) {
      Alert.alert("Error", "Subject ID already exists");
      return;
    }

    const nameExists = subjects.some(
      (s) =>
        (s.Name || s.name)?.toLowerCase() === subject.name.toLowerCase()
    );

    if (nameExists) {
      Alert.alert("Error", "Subject name already exists");
      return;
    }

    try {
      setLoading(true);

      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.post(
        "/createSubject",
        {
          ID: formattedId,
          Name: subject.name,
          Teacher: subject.teacher,
          Photo: subject.photo?.trim()
            ? subject.photo
            : "https://i.imgur.com/6ZuE4oQ.png"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      router.replace("/searchSubject");

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
    fetchSubjects();
  }, []);

  return {
    subject,
    setSubject,
    professors,
    onSave,
    loading
  };
};