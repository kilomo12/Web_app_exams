const API_URL = 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const token = localStorage.getItem('auth_token');
  const baseHeaders = { 'Content-Type': 'application/json' };
  if (token) {
    baseHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: { ...baseHeaders, ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText || 'API error';

    try {
      const parsed = JSON.parse(errorText);
      message = parsed.message || message;
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),

  getCourses: () => request('/courses'),
  createCourse: (payload) =>
    request('/courses', { method: 'POST', body: JSON.stringify(payload) }),
  updateCourse: (id, payload) =>
    request(`/courses/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),

  getExams: () => request('/exams'),
  getUpcomingExams: () => request('/exams/upcoming'),
  createExam: (payload) =>
    request('/exams', { method: 'POST', body: JSON.stringify(payload) }),
  updateExam: (id, payload) =>
    request(`/exams/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteExam: (id) => request(`/exams/${id}`, { method: 'DELETE' }),
};
