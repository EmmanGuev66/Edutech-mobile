import ApiClient from './ApiClient';
const BASE_URL = ApiClient.BASE_URL;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
  },
  STUDENTS: {
    ALL: `${BASE_URL}/getAllStudents`,
    ONE: (id) => `${BASE_URL}/getStudent/${id}`,
    CREATE: `${BASE_URL}/createStudent`,
    UPDATE: (id) => `${BASE_URL}/updateStudent/${id}`,
    DELETE: (id) => `${BASE_URL}/deleteStudent/${id}`,
  },
  TEACHERS: {
    ALL: `${BASE_URL}/getAllTeachers`,
    ONE: (id) => `${BASE_URL}/getTeacher/${id}`,
    CREATE: `${BASE_URL}/createTeacher`,
    // ... agrega los demás siguiendo el mismo patrón del PDF
  }
};