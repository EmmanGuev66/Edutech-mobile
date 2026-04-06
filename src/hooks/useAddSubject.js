import { useState } from "react";

export const useAddSubject = () => {
  const [subject, setSubject] = useState({
    id: "",
    name: "",
    teacher: "",
  });

  const professors = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "Ana López" },
    { id: "3", name: "Carlos Ruiz" },
  ];

  const onSave = () => {
    console.log("Saving subject:", subject);
  };

  return {
    subject,
    setSubject,
    professors,
    onSave,
  };
};