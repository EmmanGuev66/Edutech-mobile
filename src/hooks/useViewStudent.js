export const useViewStudent = () => {
  const student = {
    id: "4441",
    name: "Laura Gómez",
    email: "gomez.laura@utr.com",
    avatar: "https://i.pinimg.com/736x/ae/32/35/ae32350bccaf286509ffa3bcd989c906.jpg",
    subjects: ["Programming", "Math", "English"],
  };

  const onEdit = () => {
    console.log("Edit student");
  };

  const onDelete = () => {
    console.log("Delete student");
  };

  return {
    student,
    onEdit,
    onDelete,
  };
};