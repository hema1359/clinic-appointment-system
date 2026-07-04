import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DoctorsList from './pages/DoctorsList'
import BookAppointment from './pages/BookAppointment'
import PatientDashboard from './pages/PatientDashboard'
import MyAppointments from './pages/MyAppointments'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'

function PrivateRoute({ children, roles }: { children: JSX.Element, roles?: string[] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />
  return children
}

const getDashboardPath = (role: string) => {
  if (role === 'PATIENT') return '/dashboard'
  if (role === 'DOCTOR') return '/doctor'
  if (role === 'ADMIN') return '/admin'
  return '/'
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  if (!user) return children
  return <Navigate to={getDashboardPath(user.role)} />
}

export default function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-slate-950/80 text-slate-100">
        <Header />
        <main className="mx-auto w-full flex-1 px-4 pb-12 pt-8 lg:px-6">
          <div className="glass-card-strong mx-auto max-w-7xl overflow-hidden px-6 py-8 lg:px-10 lg:py-10">
            <Routes>
              <Route path="/" element={<DoctorsList />} />
              <Route path="/book/:id" element={<BookAppointment/>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/dashboard" element={<PrivateRoute roles={["PATIENT"]}><PatientDashboard /></PrivateRoute>} />
              <Route path="/my-appointments" element={<PrivateRoute roles={["PATIENT"]}><MyAppointments /></PrivateRoute>} />
              <Route path="/doctor" element={<PrivateRoute roles={["DOCTOR"]}><DoctorDashboard /></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute roles={["ADMIN"]}><AdminDashboard /></PrivateRoute>} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
