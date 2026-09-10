import { useState } from 'react'
import { addMilkEntry } from '../../services/operatorService'

const initialForm = {
  farmerId: '',
  //  date: new Date().toISOString().slice(0, 10),
  shift: 'Morning',
  quantity: '',
  fatPercentage: '',
}

export default function AddMilkEntry() {
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    if (!form.farmerId) {
      setError('Please select a farmer.')
      return
    }

    if (!form.shift) {
      setError('Please select a shift.')
      return
    }

    if (!form.quantity || form.quantity.trim() === '') {
      setError('Please enter milk quantity.')
      return
    }

    const quantity = Number(form.quantity)

    if (isNaN(quantity)) {
      setError('Quantity must be a valid number.')
      return
    }

    if (quantity <= 0) {
      setError('Quantity must be greater than 0 litres.')
      return
    }

    if (!form.fatPercentage || form.fatPercentage.trim() === '') {
      setError('Please enter fat percentage.')
      return
    }

    const fatPercentage = Number(form.fatPercentage)

    if (isNaN(fatPercentage)) {
      setError('Fat percentage must be a valid number.')
      return
    }

    if (fatPercentage <= 0 || fatPercentage > 15) {
      setError('Fat percentage must be between 0 and 15.')
      return
    }

    // ---------- API CALL ONLY AFTER VALIDATION ----------

    setSaving(true)

    try {
      const token = localStorage.getItem('token')
      const data = {
        farmerId: Number(form.farmerId),
        session: form.shift,
        quantityLiter: form.quantity,
        fat: form.fatPercentage
      }

      await addMilkEntry(token, data)

      setSuccess('Milk entry recorded.')

      setForm({
        ...initialForm
      })

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Could not record milk entry.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 font-sans">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between px-1">
          <div>
            <div className="mb-1.5 text-xs font-bold tracking-wider text-blue-600">OPERATOR</div>

            <h1 className="m-0 text-[28px] font-bold text-slate-800">
              Add Milk Entry
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Record a collection against a farmer's account.
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-blue-50 text-[27px] shadow-[0_4px_12px_rgba(37,99,235,0.08)]">
            🥛
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-[30px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

          {error && (
            <div className="mb-5 rounded-[9px] border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600">
              ⚠ {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-[9px] border border-green-200 bg-green-50 px-3.5 py-3 text-sm text-green-600">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-2 gap-5">

              {/* Farmer ID */}
              <div className="w-full [grid-column:1/-1]">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Farmer ID
                </label>

                <div className="relative w-full">
                  <span className="absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 text-base">👤</span>

                  <input
                    placeholder="Enter farmer ID"
                    value={form.farmerId}
                    onChange={(e) => handleChange('farmerId', e.target.value)}
                    required
                    className="box-border w-full rounded-[9px] border border-slate-300 bg-white p-[13px_14px_13px_42px] text-[15px] text-slate-800 outline-none"
                  />
                </div>

              </div>

              {/* Shift */}
              <div className="w-full">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Shift
                </label>

                <select
                  value={form.shift}
                  onChange={(e) => handleChange('shift', e.target.value)}
                  className="box-border w-full rounded-[9px] border border-slate-300 bg-white p-[13px_14px] text-[15px] text-slate-800 outline-none"
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>

              </div>

              {/* Quantity */}
              <div className="w-full">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Quantity (litres)
                </label>

                <div className="relative w-full">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="e.g. 12.50"
                    value={form.quantity}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    required
                    className="box-border w-full rounded-[9px] border border-slate-300 bg-white p-[13px_38px_13px_14px] text-[15px] text-slate-800 outline-none"
                  />

                  <span className="pointer-events-none absolute right-[13px] top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    L
                  </span>
                </div>

              </div>

              {/* Fat */}
              <div className="w-full">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fat %
                </label>

                <div className="relative w-full">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g. 3.50"
                    value={form.fatPercentage}
                    onChange={(e) => handleChange('fatPercentage', e.target.value)}
                    className="box-border w-full rounded-[9px] border border-slate-300 bg-white p-[13px_38px_13px_14px] text-[15px] text-slate-800 outline-none"
                  />

                  <span className="pointer-events-none absolute right-[13px] top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    %
                  </span>
                </div>

              </div>

            </div>

            <div className="mt-[30px] flex items-center justify-between gap-5 border-t border-slate-100 pt-5">

              <div className="flex items-center gap-2 text-[13px] text-slate-500">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">ℹ</span>
                Enter accurate quantity and fat percentage.
              </div>

              <button
                type="submit"
                disabled={saving}
                className=" btn btn-primary min-w-[145px] cursor-pointer rounded-[9px] border-0 bg-blue-600 px-6 py-[13px] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Recording…' : 'Record Entry'}
              </button>

            </div>

          </form>

        </div>

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
    maxWidth: '760px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    padding: '0 5px'
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
    fontWeight: '700',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '27px',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.08)'
  },

  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid #eef0f4'
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },

  field: {
    width: '100%'
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },

  inputWrapper: {
    position: 'relative',
    width: '100%'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '9px',
    fontSize: '15px',
    color: '#1f2937',
    background: '#ffffff',
    outline: 'none'
  },

  inputWithIcon: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 14px 13px 42px',
    border: '1px solid #d1d5db',
    borderRadius: '9px',
    fontSize: '15px',
    color: '#1f2937',
    background: '#ffffff',
    outline: 'none'
  },

  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    zIndex: 1
  },

  inputWithUnit: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 38px 13px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '9px',
    fontSize: '15px',
    color: '#1f2937',
    background: '#ffffff',
    outline: 'none'
  },

  unit: {
    position: 'absolute',
    right: '13px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '600',
    pointerEvents: 'none'
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

  footer: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #eeeeee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px'
  },

  info: {
    color: '#6b7280',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '7px'
  },

  infoIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700'
  },

  submitButton: {
    padding: '13px 24px',
    border: 'none',
    borderRadius: '9px',
    background: '#2563eb',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
    minWidth: '145px'
  }

}