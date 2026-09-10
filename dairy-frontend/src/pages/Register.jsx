import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/authService'

export default function Register() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobileno: '',
        address: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (user) {
        return <Navigate to="/" replace />
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await register(
                formData.username,
                formData.email,
                formData.password,
                formData.mobileno,
                formData.address
            )

            navigate('/login', { replace: true })

        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Could not create account. Please try again.'

            setError(message)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">

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
                            Create account
                        </div>

                        <div className="text-sm text-gray-500">
                            Join Ksheera
                        </div>
                    </div>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-200
                                    bg-red-50 px-4 py-3
                                    text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="username"
                            required
                            className="w-full px-4 py-3 rounded-lg
                                       border border-gray-300
                                       outline-none transition
                                       focus:border-green-500
                                       focus:ring-2 focus:ring-green-100"
                            placeholder="Enter username"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 rounded-lg
                                       border border-gray-300
                                       outline-none transition
                                       focus:border-green-500
                                       focus:ring-2 focus:ring-green-100"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onFocus={() => setShowPassword(true)}
                            onBlur={() => setShowPassword(false)}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                            className="w-full px-4 py-3 rounded-lg
                                       border border-gray-300
                                       outline-none transition
                                       focus:border-green-500
                                       focus:ring-2 focus:ring-green-100"
                            placeholder="Enter password"
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label
                            htmlFor="mobile"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Mobile Number
                        </label>

                        <input
                            id="mobile"
                            name="mobileno"
                            type="tel"
                            value={formData.mobileno}
                            onChange={handleChange}
                            autoComplete="tel"
                            inputMode="numeric"
                            pattern="[0-9+ ()-]{7,20}"
                            required
                            className="w-full px-4 py-3 rounded-lg
                                       border border-gray-300
                                       outline-none transition
                                       focus:border-green-500
                                       focus:ring-2 focus:ring-green-100"
                            placeholder="Enter mobile number"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Address
                        </label>

                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            autoComplete="address"
                            required
                            className="w-full px-4 py-3 rounded-lg
                                       border border-gray-300
                                       outline-none transition
                                       focus:border-green-500
                                       focus:ring-2 focus:ring-green-100"
                            placeholder="Enter address"
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg
                                   bg-green-600 text-white
                                   font-semibold shadow-sm transition
                                   hover:bg-green-700
                                   focus:outline-none
                                   focus:ring-2 focus:ring-green-300
                                   disabled:bg-green-300
                                   disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing up…' : 'Sign up'}
                    </button>

                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-gray-500">

                    Already have an account?{' '}

                    <Link
                        to="/login"
                        className="text-green-700 font-semibold
                                   hover:text-green-800
                                   hover:underline"
                    >
                        Sign in
                    </Link>

                </div>

            </div>
        </div>
    )
}