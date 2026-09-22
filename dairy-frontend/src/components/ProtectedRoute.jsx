import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wrap a route element and restrict it to one or more roles.
// Usage: <ProtectedRoute roles={['FARMER']}><FarmerDashboard /></ProtectedRoute>
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
