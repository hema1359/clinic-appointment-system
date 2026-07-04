import React from 'react'
import { Link } from 'react-router-dom'
import { Stethoscope } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { token, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30">
      <div className="bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white sm:px-6">
        <span>Now offering contactless booking and same-day appointments for urgent care.</span>
      </div>

      <div className="border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-900/10">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between lg:px-6">
          <Link to="/" className="flex items-center gap-3 text-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Stethoscope size={20} className="text-white" />
            </span>
            <div>
              <div className="text-lg font-semibold">ClinicCare</div>
              <div className="text-sm text-slate-500">Modern medical booking</div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
            <Link to="/" className="btn-secondary">Doctors</Link>
            {user?.role === 'PATIENT' && <Link to="/dashboard" className="btn-secondary">Dashboard</Link>}
            {user?.role === 'DOCTOR' && <Link to="/doctor" className="btn-secondary">Doctor</Link>}
            {user?.role === 'ADMIN' && <Link to="/admin" className="btn-secondary">Admin</Link>}
            {!token && <Link to="/login" className="btn-primary">Login</Link>}
            {!token && <Link to="/register" className="btn-secondary">Sign Up</Link>}
            {token && (
              <button onClick={logout} className="btn-primary bg-slate-700 hover:bg-slate-800" type="button">
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
