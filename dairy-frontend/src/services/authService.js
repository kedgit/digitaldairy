import api from '../api/axiosConfig'

// Backend accepts a single `login` field that can be either username or email.
export const login = async (login, password) => {
  const res = await api.post('/auth/login', { login, password })
  return res.data
}

export const register = async (username, email, password, mobileno, address) => {
  const res = await api.post('/auth/register', { username, email, password, mobileno, address })
  return res.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('farmerId')
  localStorage.removeItem('user')
}
