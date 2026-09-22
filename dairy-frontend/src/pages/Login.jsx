import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLE_HOME = {
  FARMER: '/farmer/profile',
  OPERATOR: '/operator/add',
  ADMIN: '/admin/operator',
}

export default function Login() {

  const { user, login, loading, error } = useAuth()

  const [loginIdentifier, setLoginIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  if (user) {
    const redirectPath = ROLE_HOME[user.role] || '/login'

    console.log("Redirecting to:", redirectPath)

    return <Navigate to={redirectPath} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const loggedInUser = await login(loginIdentifier, password)

      const redirectPath = loggedInUser?.role
        ? ROLE_HOME[loggedInUser.role] || '/login'
        : '/login'

      navigate(redirectPath, { replace: true })

    } catch {
      // error is surfaced via auth context
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-xl bg-green-600 text-white
                          flex items-center justify-center
                          text-xl font-bold shadow-md">
            K
          </div>

          <div>
            <div className="text-2xl font-bold text-gray-800">
              Ksheera
            </div>

            <div className="text-sm text-gray-500">
              Digital dairy management
            </div>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200
                          bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username / Email */}
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username or Email
            </label>

            <input
              id="login"
              type="text"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              autoComplete="username"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         outline-none transition
                         focus:border-green-500 focus:ring-2
                         focus:ring-green-100"
              placeholder="Enter username or email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         outline-none transition
                         focus:border-green-500 focus:ring-2
                         focus:ring-green-100"
              placeholder="Enter password"
            />
          </div>

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-green-600 text-white
                       font-semibold shadow-sm transition
                       hover:bg-green-700
                       focus:outline-none focus:ring-2
                       focus:ring-green-300
                       disabled:bg-green-300
                       disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center gap-3">

          <Link
            to="/forgot-password"
            className="text-sm text-green-700 font-medium
                       hover:text-green-800 hover:underline"
          >
            Forgot Password
          </Link>

          <div className="text-xs text-gray-500">
            Don't have an account?{' '}

            <Link
              to="/register"
              className="text-green-700 font-semibold
                         hover:text-green-800 hover:underline"
            >
              Create account
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}