import React, { lazy, useEffect, useRef, useState } from 'react'
import { getMyMilkEntries, getMyMilkEntriesByDateRange } from '../../services/farmerService'

export default function MilkEntries() {

  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [range, setRange] = useState({
    startDate: '',
    endDate: ''
  })
  const [dateFilter, setDateFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const loaderRef = useRef(null)



  // Load milk entries
  const load = async (params = {}, pageNumber = page) => {

    setLoading(true)
    setError('')

    try {

      const farmerId = localStorage.getItem('farmerId')

      if (!farmerId) {
        throw new Error('Farmer ID is missing')
      }

      const token = localStorage.getItem('token')
      // console.log(pageNumber)
      console.log('Loading milk entries for farmerId:', farmerId, 'with params:', params, 'pageNumber:', pageNumber)
      const res =
        params.startDate || params.endDate
          ? await getMyMilkEntriesByDateRange(
            token,
            farmerId,
            params.startDate,
            params.endDate,
            pageNumber,
            10
          )
          : await getMyMilkEntries(
            token,
            farmerId,
            pageNumber,
            10
          )
      console.log("API response:", res)

      const data = res.data?.body ?? res.data
      const content = Array.isArray(data)
        ? data
        : data?.content ?? data?.entries ?? []

      console.log('Milk entries data:', content)
      // First page → replace
      // Next pages → append
      setEntries(prev =>
        pageNumber === 0
          ? content
          : [...prev, ...content]
      )

      // Check if more pages exist
      setHasMore(Array.isArray(data) ? false : !data?.last)

    } catch (err) {

      console.error(err)
      setError('Could not load milk entries.')

    } finally {

      setLoading(false)

    }
  }


  // Initial load
  useEffect(() => {
    load({}, 0)
  }, [])


  // When page changes, load next page
  useEffect(() => {

    if (page === 0) {
      return
    }

    const params =
      range.startDate || range.endDate
        ? range
        : {}

    load(params, page)

  }, [page])


  // Detect bottom of table
  useEffect(() => {

    const observer = new IntersectionObserver(
      (observerEntries) => {

        if (
          observerEntries[0].isIntersecting &&
          hasMore &&
          !loading
        ) {
          setPage(prev => prev + 1)
        }

      },
      {
        threshold: 1
      }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      observer.disconnect()
    }

  }, [hasMore, loading])


  // Filter
  const handleFilter = (e) => {

    e.preventDefault()

    if (!range.startDate || !range.endDate) {
      setError('Select both a start date and an end date.')
      return
    }

    setEntries([])
    setPage(0)
    setHasMore(true)

    load(range, 0)
  }


  // Clear filter
  const handleClearFilter = () => {

    setRange({
      startDate: '',
      endDate: ''
    })

    setEntries([])
    setPage(0)
    setHasMore(true)

    load({}, 0)
  }


  const totalQuantity = entries.reduce((sum, e) => sum + (Number(e.quantity) || 0), 0)
  const totalAmount = entries.reduce((amt, e) => amt + (Number(e.amount) || 0), 0)

  const lazyLoadLast30Days = () => {
    const today = new Date()
    const last30Days = new Date(today)

    last30Days.setDate(today.getDate() - 30)

    const startDate = last30Days.toISOString().split('T')[0]
    const endDate = today.toISOString().split('T')[0]

    setDateFilter(false)
    setSelectedFilter('last30')

    setRange({
      startDate,
      endDate
    })

    setEntries([])
    setPage(0)
    setHasMore(true)

    load(
      {
        startDate,
        endDate
      },
      0
    )
  }

  const handleAll = () => {
    setDateFilter(false)
    setSelectedFilter('all')

    setRange({
      startDate: '',
      endDate: ''
    })

    setEntries([])
    setPage(0)
    setHasMore(true)

    load({}, 0)
  }

  const customCall = () => {
    setDateFilter(true)
    setSelectedFilter('custom')
  }
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Farmer</div>
          <h1>Milk Entries</h1>
          <div className="page-subtitle">Every collection recorded against your account.</div>
        </div>
      </div>

      <div className={`card card-pad mb-5 flex justify-start items-center gap-4 flex-wrap`}>
        <button className={`btn btn-outline ${selectedFilter === 'all' ? 'btn-selected' : ''}`} onClick={() => handleAll()}>
          All
        </button>
        <button className={`btn btn-outline ${selectedFilter === 'last30' ? 'btn-selected' : ''}`} onClick={() => lazyLoadLast30Days()}>
          last 30 Days
        </button>
        <button className={`btn btn-outline ${selectedFilter === 'custom' ? 'btn-selected' : ''}`} onClick={() => customCall()}>
          Custom
        </button>
      </div>

      {dateFilter &&
        <form className="card card-pad mb-5" onSubmit={handleFilter}>
          <div className="form-grid grid-cols-[1fr_1fr_auto] items-end gap-4">
            <div className="field-compact flex flex-col gap-2 justify-center w-fit ">
              <label className='font-semibold '>From date</label>
              <input
                className='border border-gray-400 rounded px-4 py-1 shadow-md'
                type="date"
                value={range.startDate}
                onChange={(e) => setRange((r) => ({ ...r, startDate: e.target.value }))}
              />
            </div>
            <div className="field-compact flex flex-col gap-2 justify-center w-fit ">
              <label className='font-semibold '>To date</label>
              <input
                className='border border-gray-400 rounded px-4 py-1 shadow-md'

                type="date"
                value={range.endDate}
                onChange={(e) => setRange((r) => ({ ...r, endDate: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">Filter</button>
              <button type="button" className="btn" onClick={handleClearFilter}>Clear</button>
            </div>
          </div>
        </form>
      }
      <div className="stat-row">
        <div className="stat-card pasture">
          <div className="stat-label">Total Amount</div>
          <div className="stat-value">₹{totalAmount.toFixed(2)}<span className="stat-unit">$</span></div>
        </div>
        <div className="stat-card pasture">
          <div className="stat-label">Total quantity</div>
          <div className="stat-value">{totalQuantity.toFixed(2)}<span className="stat-unit">L</span></div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loader-wrap">Loading entries…</div>
        ) : error ? (
          <div className="card-pad"><div className="alert alert-error">{error}</div></div>
        ) : entries.length === 0 ? (
          <div className="empty-state">No milk entries found for this range.</div>
        ) : (
          <>
            <table className="ledger">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>entrydate</th>
                  <th>session</th>
                  <th>quantity</th>
                  <th>fat</th>
                  <th>rate</th>
                  <th>amount</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr key={entry.id ?? idx}>
                    <td>{idx + 1}</td>
                    <td>{entry.date}</td>
                    <td>{entry.session}</td>
                    <td className="num">{entry.quantity}</td>
                    <td className="num">{entry.fatContent}</td>
                    <td className="num">{entry.rate}</td>
                    <td className="num">{entry.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              ref={loaderRef}
              className="flex h-10 items-center justify-center"
            >

              {loading && hasMore && (
                <span>
                  Loading more entries...
                </span>
              )}

              {!hasMore && (
                <span>
                  No more entries
                </span>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  )
}
