import React, { useState } from "react";
import { createOperator } from "../../services/adminService";

export default function AddOperator() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!form.username.trim()) {
            setError("Username is required");
            return;
        }

        if (!form.email.trim()) {
            setError("Email is required");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await createOperator(
                token,
                form
            );

            setMessage(
                `Operator created successfully`
            );

            setForm({
                username: "",
                email: "",
                password: ""
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Failed to create operator"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-70px)] items-start justify-center bg-green-50/40 px-5 py-10">

            <div className="w-full max-w-[520px] rounded-[14px] bg-white p-8 shadow-[0_4px_18px_rgba(0,0,0,0.08)]">

                {/* Header */}
                <div className="mb-7 flex items-center gap-[15px]">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-green-100 text-[25px]">
                        👨‍💼
                    </div>

                    <div>
                        <h2 className="m-0 text-2xl font-semibold text-green-800">
                            Add Operator
                        </h2>

                        <p className="mt-1 text-sm text-neutral-500">
                            Create a new dairy operator account
                        </p>
                    </div>
                </div>

                {/* Success */}
                {message && (
                    <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-[13px] py-[11px] text-sm text-green-800">
                        ✓ {message}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-[13px] py-[11px] text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Username */}
                    <div className="mb-5">

                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={form.username}
                            onChange={handleChange}
                            className="box-border w-full rounded-lg border border-neutral-300 px-3.5 py-3 text-[15px] outline-none"
                            required
                        />

                    </div>

                    {/* Email */}
                    <div className="mb-5">

                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter operator email"
                            value={form.email}
                            onChange={handleChange}
                            className="box-border w-full rounded-lg border border-neutral-300 px-3.5 py-3 text-[15px] outline-none"
                            required
                        />

                    </div>



                    {/* Password */}
                    <div className="mb-5">

                        <label className="mb-1.5 block text-sm font-semibold text-neutral-800">
                            Password
                        </label>

                        <div className="flex overflow-hidden rounded-lg border border-neutral-300">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                                className="min-w-0 flex-1 border-0 px-3.5 py-3 text-[15px] outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="cursor-pointer border-0 bg-neutral-100 px-3.5 font-semibold text-green-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                        <small className="mt-1.5 block text-xs text-neutral-500">
                            Password must be at least 6 characters
                        </small>

                    </div>


                    {/* Role */}
                    <div className="mb-6 flex items-center gap-3 rounded-[9px] border border-green-200 bg-green-50/70 p-[13px]">

                        <span className="text-xl">
                            🛡️
                        </span>

                        <div>
                            <div className="text-xs text-neutral-500">
                                Role
                            </div>

                            <div className="mt-0.5 text-sm font-bold text-green-800">
                                OPERATOR
                            </div>
                        </div>

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-lg border-0 bg-green-700 p-[13px] text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading
                            ? "Creating Operator..."
                            : "Add Operator"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}

