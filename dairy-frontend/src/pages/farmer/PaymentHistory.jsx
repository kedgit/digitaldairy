import React, { useEffect, useState } from 'react'
import { getMyPaymentHistory } from '../../services/farmerService'

export default function PaymentHistory() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const farmerId = localStorage.getItem('farmerId')
      if (!farmerId) {
        throw new Error('Farmer ID is missing')
      }
      const token = localStorage.getItem('token')

        const res = await getMyPaymentHistory(token,farmerId)
        setPayments(Array.isArray(res.data) ? res.data : res.data?.content || [])
      } catch (err) {
        setError('Could not load your payment history.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalPaid = payments.reduce((sum, p) => sum + (Number(p.totalAmount) || 0), 0)
  const totalAdvanceDeducted = payments.reduce((sum, p) => sum + (Number(p.advanceAmountDeducted) || 0), 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Farmer</div>
          <h1>Payment History</h1>
          <div className="page-subtitle">Payments settled to you by the dairy.</div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card pasture">
          <div className="stat-label">Total received</div>
          <div className="stat-value">₹{totalPaid.toFixed(2)}</div>
        </div>
        <div className="stat-card pasture">
          <div className="stat-label">Advance deducted</div>
          <div className="stat-value">₹{totalAdvanceDeducted.toFixed(2)}</div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loader-wrap">Loading payments…</div>
        ) : error ? (
          <div className="card-pad"><div className="alert alert-error">{error}</div></div>
        ) : payments.length === 0 ? (
          <div className="empty-state">No payments have been made to you yet.</div>
        ) : (
          <table className="ledger">
            <thead>
              <tr>
                <th>paymentDateTime</th>
                <th>periodStart</th>
                <th>periodEnd</th>
                <th>Total Milk amount</th>
                <th>Advance deducted</th>              
                <th>Net paid</th>
                 <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr key={p.id ?? idx}>
                  <td>{p.paymentDateTime}</td>
                  <td>{p.periodStart}</td>
                  <td>{p.periodEnd}</td>
                  <td className="num">₹{p.totalAmount}</td>
                  <td className="num">₹{p.advanceAmountDeducted ?? '0'}</td>
                  <td className="num">₹{p.PayableAmount}</td>
                  <td>{p.paymentStatus ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
