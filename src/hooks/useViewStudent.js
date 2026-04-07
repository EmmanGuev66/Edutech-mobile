import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useViewStudent = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const studentRes = await api.get(`/getStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = studentRes.data;
      if (data.student) data = data.student;
      else if (data.data) data = data.data;

      const subjectsRes = await api.get("/getAllSubjects", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let subjectsData = subjectsRes.data;
      if (Array.isArray(subjectsData.subjects)) subjectsData = subjectsData.subjects;
      else if (Array.isArray(subjectsData.data)) subjectsData = subjectsData.data;

      const subjectNames = (data.Subject || []).map((id) => {
        const found = subjectsData.find((s) => s._id === id);
        return found ? found.Name : "Unknown";
      });

      const mapped = {
        id: data.ID || data.id,
        name: data.Name || data.name,
        email: data.Email || data.email,
        avatar: data.Photo || "https://via.placeholder.com/150",
        subjects: subjectNames
      };

      setStudent(mapped);

    } catch (error) {
      console.log("Error fetching student:", error?.response?.data || error);
    }
  };

  const onDelete = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.delete(`/deleteStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.replace("/searchStudent");

    } catch (error) {
      console.log("Error deleting student:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  return {
    student,
    onDelete
  };
};