const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = '12345678';
const AUTH_TOKEN_KEY = 'authToken';
const STUDENTS_KEY = 'library_students';

const readStudents = () => {
  try {
    const stored = localStorage.getItem(STUDENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to read students from localStorage:', error);
    return [];
  }
};

const writeStudents = (students) => {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
};

const generateStudentId = () => {
  return `student_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
};

// Auth APIs
export const loginUser = async (email, password) => {
  try {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = `local-admin-token-${Date.now()}`;
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid credentials' };
  } catch (error) {
    return { success: false, message: error.message || 'Invalid credentials' };
  }
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Student APIs
export const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getStudents = async () => {
  try {
    return { success: true, data: readStudents() };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to fetch students' };
  }
};

export const getStudentById = async (id) => {
  try {
    const students = readStudents();
    const student = students.find((item) => String(item.id) === String(id));

    if (!student) {
      return { success: false, message: 'Student not found' };
    }

    return { success: true, data: student };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to fetch student' };
  }
};

export const createStudent = async (studentData) => {
  try {
    const students = readStudents();
    const newStudent = {
      ...studentData,
      id: studentData.id || generateStudentId(),
      seatNo: Number(studentData.seatNo),
      totalFee: Number(studentData.totalFee),
    };

    const updatedStudents = [...students, newStudent];
    writeStudents(updatedStudents);

    return { success: true, data: newStudent, message: 'Student created successfully' };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to create student' };
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const students = readStudents();
    const index = students.findIndex((student) => String(student.id) === String(id));

    if (index === -1) {
      return { success: false, message: 'Student not found' };
    }

    const updatedStudent = {
      ...students[index],
      ...studentData,
      id: String(id),
      seatNo: Number(studentData.seatNo),
      totalFee: Number(studentData.totalFee),
    };

    const updatedStudents = [...students];
    updatedStudents[index] = updatedStudent;
    writeStudents(updatedStudents);

    return { success: true, data: updatedStudent, message: 'Student updated successfully' };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to update student' };
  }
};

export const deleteStudent = async (id) => {
  try {
    const students = readStudents();
    const filteredStudents = students.filter((student) => String(student.id) !== String(id));

    if (filteredStudents.length === students.length) {
      return { success: false, message: 'Student not found' };
    }

    writeStudents(filteredStudents);
    return { success: true, message: 'Student deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to delete student' };
  }
};
