import React, { createContext, useContext, useState, useCallback } from 'react'
import { login as loginRequest, logout as logoutRequest } from '../services/authService'
import { Navigate } from 'react-router-dom'

const AuthContext = createContext(null)

function decodeJwt(token) {
  if (!token || typeof token !== 'string') return null

  try {
    const payload = token.split('.')[1]
    if (!payload) return null

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = useCallback(async (loginIdentifier, password) => {
    setLoading(true)
    setError('')
    try {
      const response = await loginRequest(loginIdentifier, password)
      const token = typeof response === 'string' ? response : response?.token

      if (!token) {
        throw new Error('No token received from server')
      }

      const decoded = decodeJwt(token)
      const userData = {
        id: decoded?.id ?? decoded?.userId ?? decoded?._id ?? null,
        name: decoded?.name ?? decoded?.username ?? loginIdentifier,
        role: decoded?.role ?? null,
        username: decoded?.username ?? loginIdentifier,
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch (err) {
      const message =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? 'Invalid username/email or password.'
          : 'Could not sign in. Please try again.')
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    logoutRequest()
    setUser(null)
  
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
