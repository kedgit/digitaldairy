import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("farmerId")
  }, [])
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
        <h1 className="mb-3 text-2xl font-bold text-slate-800">Not authorized</h1>
        <p className="mb-5 text-slate-500">
          Your account does not have access to that page.
        </p>
        <Link to="/login" className="btn btn-primary">Back to login</Link>
      </div>
    </div>
  )
}
