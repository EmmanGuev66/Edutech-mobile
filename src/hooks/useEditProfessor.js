import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import StorageService from "../helpers/StorageService";
import api from "../models/api";

export const useEditProfessor = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [professor, setProfessor] = useState({
    name: "",
    photo: "",
  });

  const [errors, setErrors] = useState({
    name: ""
  });

  const fetchProfessor = async () => {
    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      const res = await api.get(`/getTeacher/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = res.data;
      if (data.data) data = data.data;

      setProfessor({
        name: data.Name || "",
        photo: data.Photo || "",
      });

    } catch (error) {
      console.log("Error fetching professor:", error?.response?.data || error);
    }
  };

  const onSave = async () => {
    setErrors({ name: "" });

    if (!professor.name?.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (/[0-9]/.test(professor.name)) {
      setErrors({ name: "Name cannot contain numbers" });
      return;
    }

    try {
      const token = await StorageService.getToken(StorageService.KEYS.TOKEN);

      await api.put(
        `/updateTeacher/${id}`,
        {
          Name: professor.name,
          Photo: professor.photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.replace({
        pathname: "/viewProfessor",
        params: { id }
      });

    } catch (error) {
      console.log("Error updating professor:", error?.response?.data || error);
      setErrors({ name: "Could not update professor" });
    }
  };

  useEffect(() => {
    if (id) fetchProfessor();
  }, [id]);

  return {
    professor,
    setProfessor,
    onSave,
    errors
  };
};