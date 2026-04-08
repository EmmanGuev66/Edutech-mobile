import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useAddStudent = () => {
  const router = useRouter();

  const [student, setStudent] = useState({
    id: "",
    name: "",
    avatar: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [errors, setErrors] = useState({
    id: "",
    name: ""
  });

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
        data = [];
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
    setErrors({ id: "", name: "" });

    if (!student.id.trim()) {
      setErrors({ id: "ID is required", name: "" });
      return;
    }

    if (!/^[0-9]+$/.test(student.id)) {
      setErrors({ id: "Only numbers allowed", name: "" });
      return;
    }

    if (!student.name.trim()) {
      setErrors({ id: "", name: "Name is required" });
      return;
    }

    if (/[0-9]/.test(student.name)) {
      setErrors({ id: "", name: "Name cannot contain numbers" });
      return;
    }

    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const checkRes = await api.get("/getAllStudents", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = checkRes.data;

      if (Array.isArray(data)) {
      } else if (Array.isArray(data.students)) {
        data = data.students;
      } else if (Array.isArray(data.data)) {
        data = data.data;
      } else {
        data = [];
      }

      const exists = data.some(
        (s) => String(s.ID || s.id) === String(student.id)
      );

      if (exists) {
        setErrors({ id: "This ID already exists", name: "" });
        return;
      }

      const generatedEmail = `st${student.id}@school.com`;

      await api.post(
        "/createStudent",
        {
          ID: student.id,
          Name: student.name,
          Email: generatedEmail,
          Photo: student.avatar?.trim()
            ? student.avatar
            : "https://i.imgur.com/kzfWiow.png",
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
      setErrors({ id: "Could not create student", name: "" });
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
    errors
  };
};