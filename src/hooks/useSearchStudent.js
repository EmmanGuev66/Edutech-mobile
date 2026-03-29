export const useSearchStudent = () => {
  const students = [
    {
      id: "1",
      name: "Laura Gomez",
      email: "gomez.laura@utr.com",
      avatar: "https://i.pinimg.com/736x/ae/32/35/ae32350bccaf286509ffa3bcd989c906.jpg",
    },
    {
      id: "2",
      name: "Carlos Ruiz",
      email: "ruiz.carlos@utr.com",
      avatar: "https://i.pinimg.com/webp/736x/3f/84/00/3f8400984dab2717615971965e74e6c2.webp",
    },
    {
      id: "3",
      name: "Sofia Lopez",
      email: "lopez.sofia@utr.com",
      avatar: "https://i.pinimg.com/736x/c9/4e/d1/c94ed1e8a037676fe2b3348c1fe79b65.jpg",
    },
  ];

  return {
    students,
  };
};