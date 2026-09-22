import api from '../api/axiosConfig'

// ----- Operator endpoints -----
// Adjust paths to match your controller mappings.

// export const getAllFarmers = () => api.get('/operator/farmers')

// export const getFarmerById = (id) => api.get(`/operator/farmers/${id}`)

// export const addFarmer = (data) => api.post('/operator/farmers', data)

// calculate payment for farmer
export const calculatePayment = (token, farmerId) => api.get(`/api/v1/payment/calculate/${farmerId}`,{
  headers:{
    Authorization: `Bearer ${token}`
  }
})
// make payment to farmer
export const confirmPayment = (token, farmerId) => api.post(`/api/v1/payment/make/${farmerId}`,{
  headers:{
    Authorization: `Bearer ${token}`
  }
})

export const giveAdvance =(token,data)=>api.post('/api/v1/payment/advance/farmer',data,{
  headers:{
    Authorization: `Bearer${token}`
  }
})

export const getAllMilkEntries = (token,date) => api.get(`/api/v1/milkentries/operator/today?date=${date}`, {
  headers:{
    Authorization: `Bearer ${token}`
  }
})

export const addMilkEntry = (token,data) => api.post('/api/v1/milkentries/operator/add', data,
  {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
)

export const addFatRates = (token,data) => api.post('/api/v1/fatrates/operator/fatrate', data,
  {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
)
