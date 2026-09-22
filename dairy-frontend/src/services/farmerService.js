import api from '../api/axiosConfig'

// ----- Farmer self-service endpoints -----
// Adjust paths to match your controller mappings.

export const getMyProfile = (token) => api.get('api/v1/farmer/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})


export const updateMyProfile = (token, data) => api.patch('api/v1/farmer/profile', data, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getMyMilkEntries = (token, farmerId,pageNumber,size) => api.get(`/api/v1/milkentries/${farmerId}`,{
  params:{
    pageNumber,
    size 
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getMyMilkEntriesByDateRange = (token, farmerId, startDate, endDate,pageNumber,size) => api.get(`/api/v1/milkentries/${farmerId}/filter`, {
  params: {
    startDate,
    endDate,
    pageNumber,
    size
  },
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getMyAdvances = (token, farmerId) => api.get(`/api/v1/payment/advances/${farmerId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getMyPaymentHistory = (token,farmerId) => api.get(`/api/v1/payment/history/${farmerId}`,{
  headers:{
    Authorization: `Bearer ${token}`
  }
  })
