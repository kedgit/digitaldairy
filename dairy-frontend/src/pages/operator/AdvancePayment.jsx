import React, { useState } from "react";
import { giveAdvance } from "../../services/operatorService";

export default function AdvancePayment() {
  const [form, setForm] = useState({
    farmerId: "",
    amount: "",
    remarks: ""
  });
  const [advance, setAdvance] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.farmerId) {
      setError("Please enter farmer ID");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setAdvance(true)
    try {
      const token = localStorage.getItem("token");

      const amount = Number(form.amount);
      const farmerId = Number(form.farmerId);
      const remarks = form.remarks;

      const data = {
        farmerId,
        amount,
        remarks
      }

      await giveAdvance(
        token,
        data
      );

      setSuccess("Advance given successfully");

      setForm({
        farmerId: "",
        amount: "",
        remarks: ""
      });

    } catch (error) {
      console.error(error);
      setError("Failed to give advance");
    }
    finally {
      setAdvance(false)
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 font-sans">

      <div className="mx-auto max-w-[550px] rounded-2xl bg-white p-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        <div className="mb-[30px] flex items-center justify-between border-b border-slate-100 pb-5">
          <div>
            <h2 className="m-0 text-[26px] text-slate-800">Give Advance</h2>
            <p className="mt-2 mb-0 text-sm text-slate-500">
              Give an advance payment to a farmer
            </p>
          </div>

          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600">
            ₹
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Farmer ID */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Farmer ID
            </label>

            <input
              type="text"
              name="farmerId"
              placeholder="Enter farmer ID"
              value={form.farmerId}
              onChange={handleChange}
              className="box-border w-full rounded-lg border border-slate-300 p-[13px] text-[15px] outline-none"
            />
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Advance Amount
            </label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-slate-500">₹</span>

              <input
                type="text"
                name="amount"
                placeholder="Enter amount"
                value={form.amount}
                onChange={handleChange}
                className="box-border w-full rounded-lg border border-slate-300 p-[13px_13px_13px_32px] text-[15px] outline-none"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Remarks
              <span className="font-normal text-slate-400"> (Optional)</span>
            </label>

            <textarea
              name="remarks"
              placeholder="Enter remarks if required"
              value={form.remarks}
              onChange={handleChange}
              rows="4"
              className="box-border w-full resize-y rounded-lg border border-slate-300 p-[13px] text-[15px] outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-[15px] rounded-lg bg-red-100 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-[15px] rounded-lg bg-green-100 px-3 py-2 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border-0 bg-blue-600 p-[13px] text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {advance ? "Payment Processing" : "Give Advance"}
          </button>

        </form>

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    maxWidth: "550px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "1px solid #eeeeee"
  },

  title: {
    margin: 0,
    fontSize: "26px",
    color: "#1f2937"
  },

  subtitle: {
    marginTop: "7px",
    marginBottom: 0,
    color: "#6b7280",
    fontSize: "14px"
  },

  icon: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    background: "#eff6ff",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700"
  },

  field: {
    marginBottom: "20px"
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151"
  },

  optional: {
    color: "#9ca3af",
    fontWeight: "400"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none"
  },

  amountWrapper: {
    position: "relative"
  },

  currency: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontWeight: "600",
    color: "#6b7280"
  },

  amountInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 13px 13px 32px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none"
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    outline: "none",
    fontFamily: "Arial, sans-serif"
  },

  error: {
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#dc2626",
    fontSize: "14px"
  },

  success: {
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "8px",
    background: "#dcfce7",
    color: "#16a34a",
    fontSize: "14px"
  },

  submitButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer"
  }
};
