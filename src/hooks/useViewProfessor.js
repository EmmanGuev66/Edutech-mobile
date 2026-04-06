import { useState } from "react";

export const useViewProfessor = () => {
  const [professor, setProfessor] = useState({
    id: "1",
    name: "Juan Pérez",
    email: "juan@email.com",
    avatar: "https://i.pravatar.cc/150",
    subjects: ["Math", "Physics"],
  });

  const onDelete = () => {
    console.log("Deleted professor");
  };

  return {
    professor,
    onDelete,
  };
};