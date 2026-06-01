const API_BASE_URL = 'http://localhost:8085'; // Change to your backend URL

// Auth APIs
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

// Student APIs
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const getStudents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/students`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: 'Failed to fetch students' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: 'Failed to fetch student' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/students`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data, message: 'Student created successfully' };
    } else {
      return { success: false, message: 'Failed to create student' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data, message: 'Student updated successfully' };
    } else {
      return { success: false, message: 'Failed to update student' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.ok) {
      return { success: true, message: 'Student deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete student' };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
