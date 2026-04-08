import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
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
  const [studentSubjects, setStudentSubjects] = useState([]);

  const normalize = (text) => String(text).trim().toLowerCase();

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

      const subs = Array.isArray(data.Subjects)
        ? data.Subjects
        : data.Subjects
        ? [data.Subjects]
        : [];

      const names = subs.map((s) => s.Name || s);

      setStudent({
        id: data.ID || data.id,
        name: data.Name || "",
        avatar: data.Photo || "",
      });

      setStudentSubjects(names);
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

  useEffect(() => {
    if (subjects.length && studentSubjects.length) {
      const selected = subjects.filter((subj) =>
        studentSubjects.some(
          (s) => normalize(s) === normalize(subj)
        )
      );
      setSelectedSubjects(selected);
    }
  }, [subjects, studentSubjects]);

  const toggleSubject = (subject) => {
    const exists = selectedSubjects.some(
      (s) => normalize(s) === normalize(subject)
    );

    if (exists) {
      setSelectedSubjects(
        selectedSubjects.filter(
          (s) => normalize(s) !== normalize(subject)
        )
      );
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const onSave = async () => {
    if (!student.name?.trim()) {
      Alert.alert("Error", "Student name is required");
      return;
    }

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

      router.replace({
        pathname: "/viewStudent",
        params: { id }
      });
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