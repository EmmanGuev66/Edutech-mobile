import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useSearchSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

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

      const mapped = data
        .filter(item => item.ID || item.id)
        .map((item) => ({
          id: item.ID || item.id,
          name: item.Name || item.name || "No name",
          image: item.Photo || "https://via.placeholder.com/100"
        }));

      setSubjects(mapped);
      setFilteredSubjects(mapped);

    } catch (error) {
      console.log("ERROR SUBJECTS:", error?.response?.data || error);
    }
  };

  const searchSubject = (text) => {
    const filtered = subjects.filter((s) =>
      s.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredSubjects(filtered);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return {
    subjects: filteredSubjects,
    searchSubject
  };
};