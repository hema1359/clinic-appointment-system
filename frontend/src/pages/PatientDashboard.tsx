import React from 'react'
import { Link } from 'react-router-dom'

export default function PatientDashboard(){
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/20 bg-slate-950/90 p-8 text-white hero-shadow">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-200">Patient dashboard</p>
        <h2 className="mt-4 text-3xl font-semibold">Welcome back to your care hub</h2>
        <p className="mt-4 max-w-2xl text-slate-300">Manage your appointments, check treatment updates, and stay connected with your care team from one polished dashboard.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/my-appointments" className="btn-primary">View appointments</Link>
          <Link to="/" className="btn-secondary">Book a doctor</Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Upcoming visit</div>
          <div className="mt-4 text-2xl font-semibold text-slate-900">Dr. Alice</div>
          <div className="mt-2 text-sm text-slate-500">May 30, 2026 · 10:30 AM</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</div>
          <div className="mt-4 text-2xl font-semibold text-slate-900">All clear</div>
          <div className="mt-2 text-sm text-slate-500">Your appointments are confirmed and ready.</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Support</div>
          <div className="mt-4 text-2xl font-semibold text-slate-900">24/7 care</div>
          <div className="mt-2 text-sm text-slate-500">Reach out to a clinician for urgent help.</div>
        </div>
      </div>
    </div>
  )
}
