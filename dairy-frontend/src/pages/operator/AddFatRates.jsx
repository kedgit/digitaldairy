import React, { useState } from "react";
import { addFatRates } from "../../services/operatorService";


const AddFatRates = () => {
  const [fatRates, setFatRates] = useState([
    { fat: "", rate: "" }
  ]);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (index, field, value) => {
    const updated = [...fatRates];
    updated[index][field] = value;
    setFatRates(updated);
  };

  const addRow = () => {
    setFatRates([
      ...fatRates,
      { fat: "", rate: "" }
    ]);
  };

  const removeRow = (index) => {
    setFatRates(fatRates.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = fatRates.map(item => ({
      fat: Number(item.fat),
      ratePerLiter: Number(item.rate)
    }));

    console.log(data);

    try {
      const token = localStorage.getItem('token');

      await addFatRates(token, data);
      setFatRates([{ fat: "", rate: "" }]);
      setSuccess('Fat rates added successfully!');

      console.log('Fat rates submitted:', data);
    } catch (err) {
      setError('Failed to add fat rates. Please try again.');
      console.error('Error adding fat rates:', err);
    }
  }
  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 font-sans">

      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between border-b border-slate-100 pb-5">
          <div>
            <h2 className="m-0 text-[26px] font-bold text-slate-800">Add Fat Rates</h2>
            <p className="mt-2 text-sm text-slate-500">
              Configure milk rates based on fat percentage
            </p>
          </div>

          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-sky-50 text-[25px]">
            🥛
          </div>
        </div>

        {/* Form */}
        <div>{error && <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}</div>
        <div>{success && <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-600">{success}</p>}</div>
        <form onSubmit={handleSubmit}>

          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_70px] gap-[15px] px-2 pb-2 text-[13px] font-semibold text-slate-500">
            <span>Fat Percentage</span>
            <span>Rate per Liter</span>
            <span>Action</span>
          </div>

          {/* Rows */}
          <div>
            {fatRates.map((item, index) => (
              <div key={index} className="mb-3 grid grid-cols-[1fr_1fr_70px] items-center gap-[15px] rounded-[10px] border border-slate-200 bg-slate-50 p-3">

                {/* Fat */}
                <div className="relative w-full">
                  <input
                    type="text"
                    step="0.1"
                    placeholder="e.g. 3.5"
                    value={item.fat}
                    onChange={(e) =>
                      handleChange(index, "fat", e.target.value)
                    }
                    className="box-border w-full rounded-lg border border-slate-300 bg-white p-3 text-[15px] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">%</span>
                </div>

                {/* Rate */}
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 z-[1] -translate-y-1/2 font-semibold text-slate-500">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 38.50"
                    value={item.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                    className="box-border w-full rounded-lg border border-slate-300 bg-white p-3 pl-[30px] text-[15px] outline-none"
                  />
                </div>

                {/* Remove */}
                {fatRates.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="m-auto h-10 w-10 cursor-pointer rounded-lg border-0 bg-red-100 text-base text-red-600"
                    title="Remove"
                  >
                    ✕
                  </button>
                ) : (
                  <div className="m-auto h-10 w-10"></div>
                )}

              </div>
            ))}
          </div>

          {/* Add Row */}
          <button
            type="button"
            onClick={addRow}
            className="mt-2 cursor-pointer rounded-lg border border-dashed border-blue-600 bg-blue-50 px-[18px] py-[11px] text-sm font-semibold text-blue-600"
          >
            <span className="mr-1.5 text-lg">+</span>
            Add Fat Rate
          </button>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                {fatRates.length}
              </span>
              <span>
                {fatRates.length === 1 ? "Rate" : "Rates"} added
              </span>
            </div>

            <button
              type="submit"
              className="cursor-pointer rounded-lg border-0 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_10px_rgba(37,99,235,0.25)]"
            >
              Save All Rates
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

/* Tailwind utilities provide the page styling. */
/*
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif"
  },

  container: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #eeeeee",
    paddingBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#1f2937"
  },

  subtitle: {
    margin: "7px 0 0",
    color: "#6b7280",
    fontSize: "14px"
  },

  icon: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    background: "#eef7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px"
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 70px",
    gap: "15px",
    padding: "0 10px 10px",
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: "600"
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 70px",
    gap: "15px",
    alignItems: "center",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "12px"
  },

  inputWrapper: {
    position: "relative",
    width: "100%"
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    background: "#ffffff"
  },

  unit: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "600"
  },

  currency: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    fontWeight: "600",
    zIndex: 1
  },

  removeButton: {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#dc2626",
    fontSize: "16px",
    cursor: "pointer",
    margin: "auto"
  },

  emptyAction: {
    width: "40px",
    height: "40px"
  },

  addButton: {
    marginTop: "10px",
    padding: "11px 18px",
    border: "1px dashed #2563eb",
    borderRadius: "8px",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },

  plus: {
    fontSize: "18px",
    marginRight: "6px"
  },

  footer: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eeeeee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  rateCount: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#6b7280",
    fontSize: "14px"
  },

  countNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#e0edff",
    color: "#2563eb",
    fontWeight: "700"
  },

  saveButton: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.25)"
  }
}; */

export default AddFatRates;