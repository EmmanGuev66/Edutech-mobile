import { useRouter } from "expo-router";
import { useState } from "react";

export const useAddStudent = () => {
  const router = useRouter();

  // Mock student
  const [student, setStudent] = useState({
    id: "1",
    name: "Carlos Ruiz",
    age: "18",
    email: "ruiz.carlos@utr.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  });

  // Options
  const ages = ["16", "17", "18", "19"];
  const subjects = ["Math", "Physics", "Programming"];

  // ✅ MULTI SELECT STATE
  const [selectedSubjects, setSelectedSubjects] = useState(["Math"]); // precargado

  // Toggle subject
  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  // Navegación (para navbar)
  const navigateTo = (route) => {
    router.push(route);
  };

  return {
    student,
    setStudent,
    ages,
    subjects,
    selectedSubjects,
    toggleSubject,
    navigateTo,
  };
};