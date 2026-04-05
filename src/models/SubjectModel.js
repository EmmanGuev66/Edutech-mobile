export const createSubjectModel = (data) => ({
  id: data.ID || '',
  name: data.Name || '',
  teacher: data.teacher || ''
});

