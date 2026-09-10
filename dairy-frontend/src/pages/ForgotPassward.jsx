import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8081/auth/forgot-password",
                null,
                {
                    params: {
                        email: email
                    }
                }
            );

            setMessage(response.data);

        } catch (err) {
            setError(
                err.response?.data ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50
                        flex items-center justify-center px-5">

            <div className="w-full max-w-md bg-white p-8 sm:p-9 rounded-2xl
                            shadow-xl border border-gray-100">

                {/* Header */}
                <div className="text-center mb-7">

                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl
                                    bg-green-600 text-white
                                    flex items-center justify-center
                                    text-xl font-bold shadow-md">
                        K
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
                        Forgot Password?
                    </h2>

                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        Enter your registered email to receive a
                        password reset link.
                    </p>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full box-border px-4 py-3
                                   border border-gray-300 rounded-lg
                                   text-sm text-gray-800
                                   outline-none transition
                                   focus:border-green-500
                                   focus:ring-2 focus:ring-green-100
                                   placeholder:text-gray-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-5 py-3
                                   bg-green-600 text-white
                                   rounded-lg
                                   text-sm font-semibold
                                   shadow-sm transition
                                   hover:bg-green-700
                                   focus:outline-none
                                   focus:ring-2 focus:ring-green-300
                                   disabled:bg-green-300
                                   disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                {/* Success Message */}
                {message && (
                    <p className="mt-5 text-center text-sm text-green-700
                                  bg-green-50 border border-green-100
                                  rounded-lg px-4 py-3">
                        {message}
                    </p>
                )}

                {/* Error Message */}
                {error && (
                    <p className="mt-5 text-center text-sm text-red-600
                                  bg-red-50 border border-red-100
                                  rounded-lg px-4 py-3">
                        {error}
                    </p>
                )}

                {/* Back to Login */}
                <div className="text-center mt-6">

                    <Link
                        to="/login"
                        className="text-sm text-green-700
                                   font-medium
                                   hover:text-green-800
                                   hover:underline transition"
                    >
                        ← Back to Login
                    </Link>

                </div>

            </div>
        </div>
    );
}