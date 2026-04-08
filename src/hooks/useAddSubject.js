import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    teacher: ""
  });

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
      else data = [];

      setSubjects(data);

    } catch (error) {
      console.log("ERROR SUBJECTS:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    setErrors({ id: "", name: "", teacher: "" });

    if (!subject.id.trim()) {
      setErrors({ id: "ID is required", name: "", teacher: "" });
      return;
    }

    if (!/^[0-9]+$/.test(subject.id)) {
      setErrors({ id: "Only numbers allowed", name: "", teacher: "" });
      return;
    }

    if (!subject.name.trim()) {
      setErrors({ id: "", name: "Subject name is required", teacher: "" });
      return;
    }

    if (!subject.teacher) {
      setErrors({ id: "", name: "", teacher: "Select a teacher" });
      return;
    }

    const formattedId = `MAT${subject.id}`;

    const idExists = subjects.some(
      (s) => String(s.ID || s.id) === formattedId
    );

    if (idExists) {
      setErrors({ id: "ID already exists", name: "", teacher: "" });
      return;
    }

    const nameExists = subjects.some(
      (s) =>
        (s.Name || s.name)?.toLowerCase() === subject.name.toLowerCase()
    );

    if (nameExists) {
      setErrors({ id: "", name: "Subject already exists", teacher: "" });
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
      console.log("Error creating subject:", error?.response?.data || error);
      setErrors({ id: "", name: "Could not create subject", teacher: "" });
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
    loading,
    errors
  };
};