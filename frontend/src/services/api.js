const API_URL = 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API error');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const api = {
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
