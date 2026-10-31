const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = '12345678';
const AUTH_TOKEN_KEY = 'authToken';
const STUDENTS_KEY = 'library_students';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getCurrentMonthNumber = () => new Date().getMonth() + 1;
const getCurrentYear = () => new Date().getFullYear();

const getMonthName = (monthNumber) => {
  const month = Number(monthNumber || getCurrentMonthNumber());
  return monthNames[(month - 1 + 12) % 12];
};

const normalizePaymentHistory = (history, fallbackMonth, fallbackYear, fallbackFee, fallbackStatus) => {
  if (!Array.isArray(history) || history.length === 0) {
    return [{
      month: getMonthName(fallbackMonth),
      monthNumber: Number(fallbackMonth || getCurrentMonthNumber()),
      year: Number(fallbackYear || getCurrentYear()),
      amount: Number(fallbackFee || 0),
      status: fallbackStatus || 'UNPAID',
      paidDate: ''
    }];
  }

  return history.map((entry) => ({
    month: entry.month || getMonthName(entry.monthNumber || fallbackMonth),
    monthNumber: Number(entry.monthNumber || fallbackMonth || getCurrentMonthNumber()),
    year: Number(entry.year || fallbackYear || getCurrentYear()),
    amount: Number(entry.amount || fallbackFee || 0),
    status: entry.status || fallbackStatus || 'UNPAID',
    paidDate: entry.paidDate || ''
  }));
};

const normalizeStudent = (student) => {
  if (!student) return student;

  const paymentMonth = Number(student.paymentMonth || getCurrentMonthNumber());
  const paymentYear = Number(student.paymentYear || getCurrentYear());
  const monthlyFee = Number(student.monthlyFee ?? student.totalFee ?? 0);
  const paymentStatus = student.paymentStatus || student.status || 'UNPAID';

  return {
    ...student,
    id: String(student.id || `student_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`),
    seatNo: Number(student.seatNo || 0),
    totalFee: Number(student.totalFee ?? monthlyFee ?? 0),
    monthlyFee,
    paymentMonth,
    paymentYear,
    paymentStatus,
    status: paymentStatus,
    paymentHistory: normalizePaymentHistory(student.paymentHistory, paymentMonth, paymentYear, monthlyFee, paymentStatus)
  };
};

const readStudents = () => {
  try {
    const stored = localStorage.getItem(STUDENTS_KEY);
    const students = stored ? JSON.parse(stored) : [];
    return Array.isArray(students) ? students.map(normalizeStudent) : [];
  } catch (error) {
    console.error('Failed to read students from localStorage:', error);
    return [];
  }
};

const writeStudents = (students) => {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students.map(normalizeStudent)));
};

const generateStudentId = () => `student_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

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

    return { success: true, data: normalizeStudent(student) };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to fetch student' };
  }
};

export const createStudent = async (studentData) => {
  try {
    const students = readStudents();
    const newStudent = normalizeStudent({
      ...studentData,
      id: studentData.id || generateStudentId(),
      paymentStatus: studentData.paymentStatus || studentData.status || 'UNPAID',
      status: studentData.paymentStatus || studentData.status || 'UNPAID',
    });

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

    const paymentStatus = studentData.paymentStatus || studentData.status || students[index].paymentStatus || 'UNPAID';
    const monthNumber = Number(studentData.paymentMonth || students[index].paymentMonth || getCurrentMonthNumber());
    const yearNumber = Number(studentData.paymentYear || students[index].paymentYear || getCurrentYear());
    const monthlyFee = Number(studentData.monthlyFee ?? studentData.totalFee ?? students[index].monthlyFee ?? students[index].totalFee ?? 0);

    const history = Array.isArray(studentData.paymentHistory) ? studentData.paymentHistory : students[index].paymentHistory || [];
    const filteredHistory = history.filter((entry) => !(Number(entry.monthNumber) === monthNumber && Number(entry.year) === yearNumber));
    const latestEntry = {
      month: getMonthName(monthNumber),
      monthNumber,
      year: yearNumber,
      amount: monthlyFee,
      status: paymentStatus,
      paidDate: paymentStatus === 'PAID' ? new Date().toISOString() : ''
    };

    const updatedStudent = normalizeStudent({
      ...students[index],
      ...studentData,
      id: String(id),
      monthlyFee,
      totalFee: Number(studentData.totalFee ?? monthlyFee),
      paymentMonth: monthNumber,
      paymentYear: yearNumber,
      paymentStatus,
      status: paymentStatus,
      paymentHistory: [...filteredHistory, latestEntry]
    });

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
