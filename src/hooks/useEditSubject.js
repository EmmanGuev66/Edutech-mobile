import { useState } from "react";

export const useEditSubject = () => {
  const [subject, setSubject] = useState({
    id: "1",
    name: "Math",
    teacher: "Juan Pérez",
  });

  const professors = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "Ana López" },
    { id: "3", name: "Carlos Ruiz" },
  ];

  const onSave = () => {
    console.log("Updated subject:", subject);
  };

  const onDelete = () => {
    console.log("Deleted subject:", subject.id);
  };

  return {
    subject,
    setSubject,
    professors,
    onSave,
    onDelete,
  };
};