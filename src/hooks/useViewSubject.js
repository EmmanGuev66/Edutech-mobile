import { useState } from "react";

export const useViewSubject = () => {
  const [subject, setSubject] = useState({
    id: "CS101",
    name: "Programming",
    description: "Introduction to programming concepts and coding fundamentals",
    image: "https://i.imgur.com/yf01z0O.png",
    teacher: {
      name: "Jorge Eduardo Herrera Serrano",
      email: "herrera.jorge@utr.edu.com",
      avatar: "https://i.pinimg.com/736x/ae/32/35/ae32350bccaf286509ffa3bcd989c906.jpg",
    },
  });

  const onEdit = () => {
    console.log("Edit subject");
  };

  const onDelete = () => {
    console.log("Delete subject");
  };

  return {
    subject,
    onEdit,
    onDelete,
  };
};