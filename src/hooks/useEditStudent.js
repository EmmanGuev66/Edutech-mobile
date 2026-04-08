import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useEditStudent = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [student, setStudent] = useState({
    id: "",
    name: "",
    avatar: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const fetchStudent = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get(`/getStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = response.data;

      if (data.data) data = data.data;

      const mapped = {
        id: data.ID || data.id,
        name: data.Name,
        avatar: data.Photo || "",
      };

      const subs = Array.isArray(data.Subjects)
        ? data.Subjects
        : data.Subjects
        ? [data.Subjects]
        : [];

      setStudent(mapped);
      setSelectedSubjects(subs);

    } catch (error) {
      console.log("Error fetching student:", error);
    }
  };

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

      await api.put(
        `/updateStudent/${id}`,
        {
          Name: student.name,
          Subjects: selectedSubjects,
          Photo: student.avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      router.replace("/searchStudent");

    } catch (error) {
      console.log("Error updating student:", error);
    }
  };

  const navigateTo = (route) => {
    router.push(route);
  };

  useEffect(() => {
    if (id) {
      fetchStudent();
      fetchSubjects();
    }
  }, [id]);

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