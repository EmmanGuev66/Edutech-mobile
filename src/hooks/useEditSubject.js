import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    teacher: ""
  });

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

      if (Array.isArray(data)) {}
      else if (Array.isArray(data.teachers)) data = data.teachers;
      else if (Array.isArray(data.data)) data = data.data;
      else data = [];

      const mapped = data.map((item) => ({
        id: String(item.ID || item.id),
        name: item.Name || item.name
      }));

      setProfessors(mapped);

    } catch (error) {
      console.log("Error fetching teachers:", error?.response?.data || error);
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
      else data = [];

      setSubjects(data);

    } catch (error) {
      console.log("Error fetching subjects:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    setErrors({ name: "", teacher: "" });

    if (!subject.name?.trim()) {
      setErrors({ name: "Subject name is required", teacher: "" });
      return;
    }

    if (!subject.teacher) {
      setErrors({ name: "", teacher: "Select a teacher" });
      return;
    }

    const nameExists = subjects.some(
      (s) =>
        (s.Name || s.name)?.toLowerCase() === subject.name.toLowerCase() &&
        String(s.ID || s.id) !== String(subject.id)
    );

    if (nameExists) {
      setErrors({ name: "Subject already exists", teacher: "" });
      return;
    }

    try {
      setLoading(true);

      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.put(
        `/updateSubject/${subject.id}`,
        {
          Name: subject.name,
          Teacher: subject.teacher
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      router.replace("/searchSubject");

    } catch (error) {
      console.log("Error updating subject:", error?.response?.data || error);
      setErrors({ name: "Could not update subject", teacher: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchSubject();
    fetchProfessors();
    fetchSubjects();
  }, [id]);

  return {
    subject,
    setSubject,
    professors,
    onSave,
    loading,
    errors
  };
};