import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useSearchStudent = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get("/getAllStudents", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = response.data;

      if (Array.isArray(data)) {
        // ok
      } else if (Array.isArray(data.students)) {
        data = data.students;
      } else if (Array.isArray(data.data)) {
        data = data.data;
      } else {
        throw new Error("Unexpected response format");
      }

      const mapped = data
        .filter(item => item.ID || item.id) 
        .map((item) => ({
          id: item.ID || item.id,
          name: item.Name || item.name || "No name",
          email: item.Email || item.email,
          avatar: item.Photo || "https://via.placeholder.com/100"
        }));

      setStudents(mapped);
      setFilteredStudents(mapped);

    } catch (error) {
      console.log("FULL ERROR:", error);
    }
  };

  const searchStudent = (text) => {
    const filtered = students.filter((s) =>
      s.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredStudents(filtered);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students: filteredStudents,
    searchStudent
  };
};