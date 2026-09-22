import React, { useEffect, useState } from 'react'
import { getAllMilkEntries } from '../../services/operatorService'

export default function DailyMilkEntries() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('token')
      const date = new Date().toISOString().slice(0, 10)
      const res = await getAllMilkEntries(token, date)
      const data = res.data

      setEntries(Array.isArray(data) ? data : data?.content || [])
    } catch (err) {
      setError('Could not load milk entries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const totalQuantity = entries.reduce(
    (sum, e) => sum + (Number(e.quantity) || 0),
    0
  )

  const totalAmount = entries.reduce(
    (amt, e) => amt + (Number(e.amount) || 0),
    0
  )

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-10 font-sans">

      <div className="mx-auto max-w-[1100px]">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between px-1">

          <div>
            <div className="mb-1.5 text-xs font-bold tracking-wider text-blue-600">
              OPERATOR
            </div>

            <h1 className="m-0 text-[28px] font-bold text-slate-800">
              Milk Entries
            </h1>

            <div className="mt-2 text-sm text-slate-500">
              Daily milk collection records
            </div>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-blue-50 text-[27px] shadow-[0_4px_12px_rgba(37,99,235,0.08)]">
            🥛
          </div>

        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-5">

          <div className="rounded-[14px] border border-slate-100 bg-white p-[22px] shadow-[0_6px_20px_rgba(0,0,0,0.05)]">

            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-blue-50 text-sm font-bold text-blue-600">
                ₹
              </div>

              <div className="text-xs font-bold tracking-wide text-slate-500">
                TOTAL AMOUNT
              </div>
            </div>

            <div className="text-[28px] font-bold text-slate-800">
              ₹{totalAmount.toFixed(2)}
            </div>

            <div className="mt-1 text-[13px] text-slate-400">
              Today's milk collection value
            </div>

          </div>


          <div className="rounded-[14px] border border-slate-100 bg-white p-[22px] shadow-[0_6px_20px_rgba(0,0,0,0.05)]">

            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-blue-50 text-sm font-bold text-blue-600">
                L
              </div>

              <div className="text-xs font-bold tracking-wide text-slate-500">
                TOTAL QUANTITY
              </div>
            </div>

            <div className="text-[28px] font-bold text-slate-800">
              {totalQuantity.toFixed(2)}
              <span className="text-lg text-slate-500"> L</span>
            </div>

            <div className="mt-1 text-[13px] text-slate-400">
              Total milk collected today
            </div>

          </div>

        </div>


        {/* Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-[22px]">

            <div>
              <h2 className="m-0 text-[19px] text-slate-800">
                Today's Collection
              </h2>

              <p className="mt-1 text-[13px] text-slate-400">
                Milk collection records for today
              </p>
            </div>

            <button
              onClick={load}
              className="cursor-pointer rounded-lg border border-blue-100 bg-blue-50 px-[15px] py-[9px] text-[13px] font-semibold text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              ↻ Refresh
            </button>

          </div>


          {/* Loading */}
          {loading ? (

            <div className="flex min-h-[250px] flex-col items-center justify-center text-slate-500">
              <div className="mb-2.5 text-[35px]">
                🥛
              </div>

              <div className="text-sm">
                Loading entries…
              </div>
            </div>

          ) : error ? (

            <div className="p-6">
              <div className="rounded-[9px] border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600">
                ⚠ {error}
              </div>
            </div>

          ) : entries.length === 0 ? (

            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">

              <div className="mb-[15px] flex h-[60px] w-[60px] items-center justify-center rounded-[15px] bg-slate-100 text-[28px]">
                🥛
              </div>

              <div className="text-[17px] font-semibold text-slate-700">
                No milk entries found
              </div>

              <div className="mt-1.5 text-[13px] text-slate-400">
                No milk collection records are available for today.
              </div>

            </div>

          ) : (

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[800px] border-collapse">

                <thead>
                  <tr>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Sr. No</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Entry Date</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Session</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Quantity</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Fat</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Rate</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-[18px] py-3.5 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Amount</th>
                  </tr>
                </thead>

                <tbody>

                  {entries.map((entry, idx) => (

                    <tr
                      key={entry.id ?? idx}
                      className="transition-colors"
                    >

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-sm text-slate-700">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">
                          {idx + 1}
                        </span>
                      </td>

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-sm text-slate-700">
                        {entry.date}
                      </td>

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-sm text-slate-700">

                        <span
                          className={
                            entry.session === 'Morning'
                              ? 'inline-block rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600'
                              : 'inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600'
                          }
                        >
                          {entry.session}
                        </span>

                      </td>

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-right text-sm font-medium text-slate-700">
                        {entry.quantity} L
                      </td>

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-right text-sm font-medium text-slate-700">
                        {entry.fatContent}%
                      </td>

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-right text-sm font-medium text-slate-700">
                        ₹{entry.rate}
                      </td>

                      <td className="border-b border-slate-100 px-[18px] py-[15px] text-right text-sm font-bold text-blue-600">
                        ₹{entry.amount}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

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
    maxWidth: '1100px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
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
    marginTop: '7px',
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

  statRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '24px'
  },

  statCard: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '22px',
    border: '1px solid #eef0f4',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)'
  },

  statTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },

  statIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '9px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '14px'
  },

  statLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: '0.5px'
  },

  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937'
  },

  statUnit: {
    fontSize: '18px',
    color: '#6b7280'
  },

  statDescription: {
    marginTop: '5px',
    fontSize: '13px',
    color: '#9ca3af'
  },

  tableCard: {
    background: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #eef0f4',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden'
  },

  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '22px 24px',
    borderBottom: '1px solid #eeeeee'
  },

  tableTitle: {
    margin: 0,
    fontSize: '19px',
    color: '#1f2937'
  },

  tableSubtitle: {
    margin: '5px 0 0',
    fontSize: '13px',
    color: '#9ca3af'
  },

  refreshButton: {
    padding: '9px 15px',
    border: '1px solid #dbeafe',
    borderRadius: '8px',
    background: '#eff6ff',
    color: '#2563eb',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },

  tableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px'
  },

  th: {
    textAlign: 'left',
    padding: '14px 18px',
    background: '#f8fafc',
    color: '#6b7280',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    borderBottom: '1px solid #e5e7eb'
  },

  td: {
    padding: '15px 18px',
    fontSize: '14px',
    color: '#374151',
    borderBottom: '1px solid #f0f1f3'
  },

  tr: {
    transition: 'background 0.2s'
  },

  serial: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '7px',
    background: '#f3f4f6',
    color: '#4b5563',
    fontSize: '12px',
    fontWeight: '600'
  },

  num: {
    textAlign: 'right',
    fontWeight: '500'
  },

  amount: {
    textAlign: 'right',
    fontWeight: '700',
    color: '#2563eb'
  },

  morning: {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '20px',
    background: '#fff7ed',
    color: '#ea580c',
    fontSize: '12px',
    fontWeight: '600'
  },

  evening: {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '20px',
    background: '#eef2ff',
    color: '#4f46e5',
    fontSize: '12px',
    fontWeight: '600'
  },

  loaderWrap: {
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280'
  },

  loaderIcon: {
    fontSize: '35px',
    marginBottom: '10px'
  },

  loaderText: {
    fontSize: '14px'
  },

  alertContainer: {
    padding: '24px'
  },

  error: {
    padding: '12px 14px',
    borderRadius: '9px',
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    fontSize: '14px'
  },

  emptyState: {
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  emptyIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '15px',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginBottom: '15px'
  },

  emptyTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#374151'
  },

  emptyText: {
    marginTop: '6px',
    fontSize: '13px',
    color: '#9ca3af'
  }

}