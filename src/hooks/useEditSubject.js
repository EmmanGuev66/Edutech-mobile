import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useEditSubject = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params?.id;

  const [subject, setSubject] = useState({
    id: "",
    name: "",
    teacher: ""
  });

  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubject = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const res = await api.get(`/getSubject/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let data = res.data;
      if (data.data) data = data.data;

      const teacherId = data.Teacher?.ID
        ? String(data.Teacher.ID)
        : "";

      setSubject({
        id: String(data.ID || id),
        name: data.Name || "",
        teacher: teacherId
      });

    } catch (error) {
      console.log("Error fetching subject:", error?.response?.data || error);
    }
  };

  const fetchProfessors = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get("/getAllTeachers", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let data = response.data;

      if (Array.isArray(data)) {
      } else if (Array.isArray(data.teachers)) {
        data = data.teachers;
      } else if (Array.isArray(data.data)) {
        data = data.data;
      } else {
        throw new Error("Formato inesperado");
      }

      const mapped = data.map((item) => ({
        id: String(item.ID || item.id),
        name: item.Name || item.name
      }));

      setProfessors(mapped);

    } catch (error) {
      console.log("Error fetching teachers:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    try {
      if (!subject.id) {
        Alert.alert("Error", "Subject ID missing");
        return;
      }

      if (!subject.teacher) {
        Alert.alert("Error", "Select a teacher");
        return;
      }

      setLoading(true);

      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.put(`/updateSubject/${subject.id}`, {
        Name: subject.name,
        Teacher: subject.teacher
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      router.replace("/searchSubject");

    } catch (error) {
      console.log("Error updating subject:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchSubject();
    fetchProfessors();
  }, [id]);

  return {
    subject,
    setSubject,
    professors,
    onSave,
    loading
  };
};