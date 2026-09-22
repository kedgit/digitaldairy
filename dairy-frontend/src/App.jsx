import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Unauthorized from './pages/Unauthorized'
import ForgotPassword from './pages/ForgotPassward'
import ResetPassword from './pages/ResetPassword'

import FarmerProfile from './pages/farmer/FarmerProfile'
import MilkEntries from './pages/farmer/MilkEntries'
import Advance from './pages/farmer/Advance'
import PaymentHistory from './pages/farmer/PaymentHistory'


import AdvancePayment from './pages/operator/AdvancePayment'
import AddMilkEntry from './pages/operator/AddMilkEntry'
import DailyMilkEntries from './pages/operator/DailyMilkEntries'
import AddFatRates from './pages/operator/AddFatRates'
import FarmerPayment from './pages/operator/FarmerPayment'

import AddOperator from './pages/admin/AddOperator'

import Home from './pages/Home'

const ROLE_HOME = {
  FARMER: '/farmer/profile',
  OPERATOR: '/operator/milk-entry',
  ADMIN: '/admin/operator',
}
console.log("APP FILE LOADED")
export default function App() {
  const { user } = useAuth()
  console.log("APP STARTED");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path='/home' element={<Home/>}/>

      <Route
        path="/"
        element={
          user ? (
            <Navigate to={ROLE_HOME[user.role] || '/home'} replace />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />

      {/* Shared authenticated shell */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Farmer */}
        <Route
          path="/farmer/profile"
          element={<ProtectedRoute roles={['FARMER']}><FarmerProfile /></ProtectedRoute>}
        />
        <Route
          path="/farmer/milk-entries"
          element={<ProtectedRoute roles={['FARMER']}><MilkEntries /></ProtectedRoute>}
        />
        <Route
          path="/farmer/advance"
          element={<ProtectedRoute roles={['FARMER']}><Advance /></ProtectedRoute>}
        />
        <Route
          path="/farmer/payments"
          element={<ProtectedRoute roles={['FARMER']}><PaymentHistory /></ProtectedRoute>}
        />

        {/* Operator */}
        <Route
          path="/operator/advance-payment"
          element={<ProtectedRoute roles={['OPERATOR']}><AdvancePayment/></ProtectedRoute>}
        />
        
        <Route
          path="/operator/fatrate"
          element={<ProtectedRoute roles={['OPERATOR']}><AddFatRates/></ProtectedRoute>}
        />
       
        <Route
          path="/operator/today"
          element={<ProtectedRoute roles={['OPERATOR']}><DailyMilkEntries /></ProtectedRoute>}
        />
        <Route
          path="/operator/milk-entry"
          element={<ProtectedRoute roles={['OPERATOR']}><AddMilkEntry /></ProtectedRoute>}
        />

        <Route 
          path="/operator/payment"
        element={<ProtectedRoute roles={['OPERATOR']}><FarmerPayment/></ProtectedRoute>}
        />


        {/* Admin */}
        
        <Route
        path="/admin/operator"
        element={<ProtectedRoute roles={['ADMIN']}><AddOperator/></ProtectedRoute>}
        />
       
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

    </Routes>
  )
}

