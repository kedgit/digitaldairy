import React, { useEffect, useState } from 'react'
import { getMyAdvances } from '../../services/farmerService'

export default function Advance() {
  const [advances, setAdvances] = useState([])
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
        
        const res = await getMyAdvances(token, farmerId)

        setAdvances(Array.isArray(res.data) ? res.data : res.data?.content || [])
      } catch (err) {
        setError('Could not load your advance records.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalAdvance = advances.reduce((sum, a) => sum + (Number(a.amount) || 0), 0)
  const totalRecovered = advances.reduce((sum, a) => sum + (Number(a.remainingAmount) || 0), 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Farmer</div>
          <h1>Advance Money Taken</h1>
          <div className="page-subtitle">Advances issued against your future milk payments.</div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card clay">
          <div className="stat-label">Total advance outstanding</div>
          <div className="stat-value">₹{totalAdvance.toFixed(2)}</div>
        </div>
        <div className="stat-card clay">
          <div className="stat-label">Total Remaining advance</div>
          <div className="stat-value">₹{totalRecovered.toFixed(2)}</div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loader-wrap">Loading advances…</div>
        ) : error ? (
          <div className="card-pad"><div className="alert alert-error">{error}</div></div>
        ) : advances.length === 0 ? (
          <div className="empty-state">No advance has been recorded for your account.</div>
        ) : (
          <table className="ledger">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Remaining Amount</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {advances.map((a, idx) => (
                <tr key={a.id ?? idx}>
                  <td>{a.advanceDateTime || a.givenDate}</td>
                  <td className="num">₹{a.amount}</td>
                  <td className="num">₹{a.remainingAmount}</td>
                  <td>{a.remarks || a.reason || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
