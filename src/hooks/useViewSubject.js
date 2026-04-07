import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useViewSubject = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [subject, setSubject] = useState(null);

  const fetchSubject = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const res = await api.get(`/getSubject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = res.data;
      if (data.data) data = data.data;

      let teacherData = null;
      const teacher = data.Teacher;


      if (teacher) {
        if (typeof teacher === "object") {
          teacherData = {
            name: teacher.Name || "Unknown",
            email: teacher.Email || "",
            avatar: teacher.Photo || "https://via.placeholder.com/150"
          };
        }

        else if (typeof teacher === "string") {
          const teachersRes = await api.get("/getAllTeachers", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          let teachers = teachersRes.data;

          if (Array.isArray(teachers.data)) teachers = teachers.data;
          else if (Array.isArray(teachers)) {}
          else teachers = [];

          const found = teachers.find((t) =>
            t.ID === teacher ||
            t.Name === teacher ||
            t._id === teacher
          );

          if (found) {
            teacherData = {
              name: found.Name,
              email: found.Email,
              avatar: found.Photo || "https://via.placeholder.com/150"
            };
          }
        }
      }

      if (!teacherData) {
        teacherData = {
          name: "No teacher assigned",
          email: "",
          avatar: "https://via.placeholder.com/150"
        };
      }

      const mapped = {
        id: data.ID,
        name: data.Name,
        image: data.Photo || "https://via.placeholder.com/150",
        teacher: teacherData 
      };

      setSubject(mapped);

    } catch (error) {
      console.log("Error fetching subject:", error?.response?.data || error);
    }
  };

  const onDelete = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.delete(`/deleteSubject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.replace("/searchSubject");

    } catch (error) {
      console.log("Error deleting subject:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    if (id) fetchSubject();
  }, [id]);

  return {
    subject,
    onDelete
  };
};