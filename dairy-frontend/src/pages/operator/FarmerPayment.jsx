import React, { useState } from 'react'
import {
  calculatePayment,
  confirmPayment
} from '../../services/operatorService'

export default function FarmerPayment() {

  const [farmerId, setFarmerId] = useState('')
  const [payment, setPayment] = useState(null)

  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleCalculate = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')
    setPayment(null)

    if (!farmerId) {
      setError('Please enter farmer ID.')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const res = await calculatePayment(
        token,
        farmerId
      )

      setPayment(res.data)

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Could not calculate payment.'
      )
    } finally {
      setLoading(false)
    }
  }


  const handleConfirmPayment = async () => {

    setError('')
    setSuccess('')

    if (!payment) {
      return
    }

    setConfirming(true)

    try {
      const token = localStorage.getItem('token')

      const res = await confirmPayment(
        token,
        farmerId
      )

      setPayment(null)
      setFarmerId('')
      setSuccess('Payment completed successfully.')

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Could not complete payment.'
      )
    } finally {
      setConfirming(false)
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 font-sans">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-[25px] flex items-center justify-between">

          <div>
            <div className="mb-1.5 text-xs font-bold tracking-wider text-blue-600">
              OPERATOR
            </div>

            <h1 className="m-0 text-[28px] text-slate-800">
              Farmer Payment
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Calculate and settle a farmer's outstanding payment.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-blue-50 text-[25px] font-bold text-blue-600">
            ₹
          </div>

        </div>


        {/* Farmer ID */}
        <div className="mb-5 rounded-[14px] border border-slate-100 bg-white p-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">

          <form onSubmit={handleCalculate}>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Farmer ID
            </label>

            <div className="flex gap-3">

              <input
                type="number"
                placeholder="Enter farmer ID"
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                className="min-w-0 flex-1 rounded-[9px] border border-slate-300 p-[13px] text-[15px] outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-[9px] border-0 bg-blue-600 px-6 py-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Calculating…' : 'Calculate'}
              </button>

            </div>

          </form>

        </div>


        {/* Error */}
        {error && (
          <div className="mb-5 rounded-[9px] border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600">
            ⚠ {error}
          </div>
        )}


        {/* Success */}
        {success && (
          <div className="mb-5 rounded-[9px] border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-600">
            ✓ {success}
          </div>
        )}


        {/* Payment Summary */}
        {payment && (

          <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.07)]">

            <div className="flex items-center justify-between border-b border-slate-100 pb-5">

              <div>
                <h2 className="m-0 text-xl text-slate-800">
                  Payment Summary
                </h2>

                <p className="mt-1.5 text-[13px] text-slate-400">
                  Review the amount before confirming payment.
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                Farmer #{farmerId}
              </div>

            </div>


            {/* Period */}
            <div className="mt-5 rounded-[9px] bg-slate-50 p-[15px]">

              <div>
                <span className="text-[11px] font-bold text-slate-400">
                  PAYMENT PERIOD
                </span>

                <div className="mt-1 text-sm font-semibold text-slate-700">
                  {payment.periodStart} → {payment.periodEnd}
                </div>
              </div>

            </div>


            {/* Details */}
            <div className="mt-5">

              <div className="flex justify-between border-b border-slate-100 py-3.5 text-sm text-slate-500">
                <span>Total Quantity</span>
                <strong>
                  {payment.totalMilk} L
                </strong>
              </div>

              <div className="flex justify-between border-b border-slate-100 py-3.5 text-sm text-slate-500">
                <span>Milk Amount</span>
                <strong>
                  ₹{Number(payment.totalAmount || 0).toFixed(2)}
                </strong>
              </div>

              <div className="flex justify-between border-b border-slate-100 py-3.5 text-sm text-slate-500">
                <span>Total Advance Deduct</span>
                <strong className="text-red-600">
                  - ₹{Number(payment.advanceAmountDeducted || 0).toFixed(2)}
                </strong>
              </div>

              <div className="flex justify-between border-b border-slate-100 py-3.5 text-sm text-slate-500">
                <span>Payment Status</span>
                <strong className="text-red-600">
                  {payment.paymentStatus || "PENDING"}
                </strong>
              </div>

            </div>


            {/* Final Amount */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-50 p-5">

              <div>
                <div className="text-xs font-bold text-blue-600">
                  FINAL PAYABLE
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Amount to be paid to farmer
                </div>
              </div>

              <div className="text-[28px] font-bold text-blue-600">
                ₹{Number(payment.PayableAmount || 0).toFixed(2)}
              </div>

            </div>


            {/* Confirm */}
            <div className="mt-6 text-right">

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={confirming}
                className="cursor-pointer rounded-[9px] border-0 bg-green-600 px-6 py-[13px] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {confirming
                  ? 'Processing…'
                  : 'Confirm & Make Payment'}
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  )
}


const styles = {

  page: {
    minHeight: '100vh',
    background: '#f5f7fb',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif'
  },

  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },

  eyebrow: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: '1px',
    marginBottom: '6px'
  },

  title: {
    margin: 0,
    fontSize: '28px',
    color: '#1f2937'
  },

  subtitle: {
    margin: '7px 0 0',
    color: '#6b7280',
    fontSize: '14px'
  },

  icon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px',
    fontWeight: '700'
  },

  card: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '24px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
    border: '1px solid #eef0f4',
    marginBottom: '20px'
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },

  searchRow: {
    display: 'flex',
    gap: '12px'
  },

  input: {
    flex: 1,
    padding: '13px',
    border: '1px solid #d1d5db',
    borderRadius: '9px',
    fontSize: '15px',
    outline: 'none'
  },

  calculateButton: {
    padding: '13px 24px',
    border: 'none',
    borderRadius: '9px',
    background: '#2563eb',
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer'
  },

  error: {
    padding: '12px 14px',
    marginBottom: '20px',
    borderRadius: '9px',
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    fontSize: '14px'
  },

  success: {
    padding: '12px 14px',
    marginBottom: '20px',
    borderRadius: '9px',
    background: '#dcfce7',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
    fontSize: '14px'
  },

  summaryCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
    border: '1px solid #eef0f4'
  },

  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid #eeeeee'
  },

  summaryTitle: {
    margin: 0,
    fontSize: '20px',
    color: '#1f2937'
  },

  summarySubtitle: {
    margin: '6px 0 0',
    fontSize: '13px',
    color: '#9ca3af'
  },

  farmerBadge: {
    background: '#eff6ff',
    color: '#2563eb',
    padding: '7px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },

  periodBox: {
    background: '#f8fafc',
    padding: '15px',
    borderRadius: '9px',
    marginTop: '20px'
  },

  smallLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#9ca3af'
  },

  period: {
    marginTop: '5px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },

  details: {
    marginTop: '20px'
  },

  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #f0f1f3',
    fontSize: '14px',
    color: '#6b7280'
  },

  advance: {
    color: '#dc2626'
  },

  finalAmount: {
    marginTop: '20px',
    padding: '20px',
    borderRadius: '12px',
    background: '#eff6ff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  finalLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#2563eb'
  },

  finalDescription: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#6b7280'
  },

  amount: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2563eb'
  },

  confirmArea: {
    marginTop: '25px',
    textAlign: 'right'
  },

  confirmButton: {
    padding: '13px 25px',
    border: 'none',
    borderRadius: '9px',
    background: '#16a34a',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(22,163,74,0.2)'
  }

}