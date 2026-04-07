import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useSearchProfessor = () => {
  const [professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);

  const fetchProfessors = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const response = await api.get("/getAllTeachers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      let data = response.data;

      if (Array.isArray(data)) {
      } else if (Array.isArray(data.teachers)) {
        data = data.teachers;
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

      setProfessors(mapped);
      setFilteredProfessors(mapped);

    } catch (error) {
      console.log("FULL ERROR:", error);
    }
  };

  const searchProfessor = (text) => {
    const filtered = professors.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredProfessors(filtered);
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  return {
    professors: filteredProfessors,
    searchProfessor
  };
};