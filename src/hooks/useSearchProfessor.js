export const useSearchProfessor = () => {
  const professors = [
    {
      id: "1",
      name: "Ms Honey",
      email: "gomez.laura@utr.com",
      avatar: "https://i.pinimg.com/webp/1200x/67/b3/2e/67b32e2382cf5fe7e67602ee449b35e9.webp",
    },
    {
      id: "2",
      name: "Carlos Ruiz",
      email: "ruiz.carlos@utr.com",
      avatar: "https://i.pinimg.com/webp/1200x/65/3b/2d/653b2de6f248d3d0a0d5b591b0bcb8f4.webp",
    },
    {
      id: "3",
      name: "Sofia Lopez",
      email: "lopez.sofia@utr.com",
      avatar: "https://i.pinimg.com/webp/1200x/02/b7/37/02b7376a5b7f511f83a38941c089cdad.webp",
    },
  ];

  return {
    professors,
  };
};