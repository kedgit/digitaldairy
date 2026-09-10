import axios from 'axios'

// Adjust this in your .env file (VITE_API_BASE_URL) to match your Spring Boot backend.
const BASE_URL = 'http://localhost:8081'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to every outgoing request.
// Assumption: backend issues a JWT on login and expects it as `Authorization: Bearer <token>`.
// If your backend uses a session/cookie instead, remove this interceptor and set
// `withCredentials: true` above.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto logout on 401 (expired/invalid token).
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("hi")
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
