import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useHome = () => {
  const router = useRouter();

  const [stats, setStats] = useState({
    students: 0,
    professors: 0,
    subjects: 0
  });

  const navigateTo = (route) => {
    router.push(route);
  };

  const fetchStats = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const [studentsRes, teachersRes, subjectsRes] = await Promise.all([
        api.get("/getAllStudents", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get("/getAllTeachers", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get("/getAllSubjects", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const normalize = (res) => {
        let data = res.data;

        if (Array.isArray(data)) return data;
        if (Array.isArray(data.data)) return data.data;
        if (Array.isArray(data.students)) return data.students;
        if (Array.isArray(data.teachers)) return data.teachers;
        if (Array.isArray(data.subjects)) return data.subjects;

        return [];
      };

      setStats({
        students: normalize(studentsRes).length,
        professors: normalize(teachersRes).length,
        subjects: normalize(subjectsRes).length
      });

    } catch (error) {
      console.log("Error fetching stats:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    navigateTo
  };
};