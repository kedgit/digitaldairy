import React, { useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

export default function ResetPassword() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8081/auth/reset-password",
                null,
                {
                    params: {
                        token: token,
                        newPassword: password
                    }
                }
            );

            setMessage(response.data);

            setPassword("");
            setConfirmPassword("");

        } catch (err) {

            setError(
                err.response?.data ||
                "Invalid or expired reset link."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#F5F8F5] p-5">

            <div className="w-full max-w-[400px] bg-white p-[35px] rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)]">

                <div className="text-center mb-7">

                    <h2 className="m-0 text-[#2F6041] text-[27px] font-semibold">
                        Reset Password
                    </h2>

                    <p className="mt-2.5 text-[#777] text-sm">
                        Enter your new password below.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <label className="block mb-[7px] text-[#444] text-sm font-medium">
                        New Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full box-border px-3.5 py-3 border border-[#D5DDD7] rounded-lg text-sm outline-none mb-[18px]"
                    />

                    <label className="block mb-[7px] text-[#444] text-sm font-medium">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full box-border px-3.5 py-3 border border-[#D5DDD7] rounded-lg text-sm outline-none mb-[18px]"
                    />

                    <button
                        type="submit"
                        disabled={loading || !token}
                        className={`w-full py-3 bg-[#3D7A52] text-white border-0 rounded-lg text-[15px] font-semibold ${
                            loading
                                ? "cursor-not-allowed opacity-70"
                                : "cursor-pointer"
                        }`}
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>

                </form>

                {message && (
                    <p className="mt-[18px] text-center text-[#3D7A52] text-[13px]">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-[18px] text-center text-[#D9534F] text-[13px]">
                        {error}
                    </p>
                )}

                <div className="text-center mt-[22px]">

                    <Link
                        to="/login"
                        className="text-[13px] text-[#3D7A52] no-underline"
                    >
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}