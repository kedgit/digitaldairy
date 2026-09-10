import api from '../api/axiosConfig'

// ----- Admin endpoints -----
// Adjust paths to match your controller mappings.

//export const getAllFarmers = () => api.get('/admin/farmers')

// Fetch a farmer's total milk entries between two dates (yyyy-MM-dd).
export const getFarmerMilkEntriesBetweenDates = (farmerId, startDate, endDate) =>
  api.get(`/admin/farmers/${farmerId}/milk-entries`, {
    params: { startDate, endDate },
  })

// Make a payment for a farmer.
export const makePayment = (data) => api.post('/api/v1/admin/payments', data)

export const createOperator=(token,data)=> api.post('/auth/admin/addoperator',data,{
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllPayments = () => api.get('/admin/payments')
