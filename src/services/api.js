const BASE_URL = 'https://to-do-list-r0zh.onrender.com'

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Erro na requisição')
  }

  return data
}

export const api = {
  // Auth
  register: (body) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body) => request('/api/auth/login',    { method: 'POST', body: JSON.stringify(body) }),

  // Users
  getProfile:    ()     => request('/api/users/profile'),
  updateProfile: (body) => request('/api/users/profile', { method: 'PATCH', body: JSON.stringify(body) }),
  deleteProfile: ()     => request('/api/users/profile', { method: 'DELETE' }),

  // Tasks
  getTasks:   ()         => request('/api/tasks'),
  getTask:    (id)       => request(`/api/tasks/${id}`),
  createTask: (body)     => request('/api/tasks',      { method: 'POST',   body: JSON.stringify(body) }),
  updateTask: (id, body) => request(`/api/tasks/${id}`, { method: 'PUT',   body: JSON.stringify(body) }),
  deleteTask: (id)       => request(`/api/tasks/${id}`, { method: 'DELETE' }),
}