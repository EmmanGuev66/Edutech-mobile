import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddStudent = () => {
  const router = useRouter();

  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get("/getAllSubjects", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = response.data;

      if (Array.isArray(data)) {
      } else if (Array.isArray(data.subjects)) {
        data = data.subjects;
      } else if (Array.isArray(data.data)) {
        data = data.data;
      } else {
        throw new Error("Unexpected response format");
      }

      const names = data.map((s) => s.Name);
      setSubjects(names);

    } catch (error) {
      console.log("Error fetching subjects:", error);
    }
  };

  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const onSave = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.post(
        "/createStudent",
        {
          ID: student.id,
          Name: student.name,
          Email: student.email,
          Photo: student.avatar, // 🔥 FIX
          Subjects:
            selectedSubjects.length === 1
              ? selectedSubjects[0]
              : selectedSubjects,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      router.replace("/searchStudent");

    } catch (error) {
      console.log("Error creating student:", error?.response?.data || error);
    }
  };

  const navigateTo = (route) => {
    router.push(route);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return {
    student,
    setStudent,
    subjects,
    selectedSubjects,
    toggleSubject,
    navigateTo,
    onSave,
  };
};