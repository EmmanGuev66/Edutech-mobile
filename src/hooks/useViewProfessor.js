import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useViewProfessor = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [professor, setProfessor] = useState(null);

  const fetchProfessor = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const res = await api.get(`/getTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = res.data;
      if (data.data) data = data.data;

      const subjectsRes = await api.get("/getAllSubjects", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let subjectsData = subjectsRes.data;

      if (Array.isArray(subjectsData.subjects)) subjectsData = subjectsData.subjects;
      else if (Array.isArray(subjectsData.data)) subjectsData = subjectsData.data;
      else if (!Array.isArray(subjectsData)) subjectsData = [];

      // 🔥 FIX REAL AQUÍ
      const subjectNames = subjectsData
        .filter((s) => {
          const teacher = s.Teacher;

          if (!teacher) return false;

          // 🧠 CASO 1: Teacher es OBJETO
          if (typeof teacher === "object") {
            return (
              teacher._id === data._id ||
              teacher.ID === data.ID ||
              teacher.Name === data.Name
            );
          }

          // 🧠 CASO 2: Teacher es STRING
          if (typeof teacher === "string") {
            return (
              teacher === data.ID ||
              teacher === data.Name ||
              teacher === data._id
            );
          }

          return false;
        })
        .map((s) => s.Name || s.name);

      const mapped = {
        id: data.ID,
        name: data.Name,
        email: data.Email,
        avatar: data.Photo || "https://via.placeholder.com/150",
        subjects: subjectNames
      };

      setProfessor(mapped);

    } catch (error) {
      console.log("Error fetching professor:", error?.response?.data || error);
    }
  };

  const onDelete = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.delete(`/deleteTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.replace("/searchProfessor");

    } catch (error) {
      console.log("Error deleting professor:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    if (id) fetchProfessor();
  }, [id]);

  return {
    professor,
    onDelete
  };
};