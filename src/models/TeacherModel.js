export const createTeacherModel = (data) => ({
  id: data.ID || '',
  name: data.Name || '',
  email: data.Email || '',
  courses: data.Courses || [],
  photo: data.Photo || '',
});