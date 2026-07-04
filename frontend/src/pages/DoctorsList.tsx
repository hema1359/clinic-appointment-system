import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const fetch = async (specialization?: string) => {
    setLoading(true)
    const r = await api.get('/doctors', { params: specialization ? { specialization } : {} })
    setDoctors(r.data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950/90 p-8 text-white hero-shadow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_35%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-blue-100/20 px-4 py-2 text-sm font-semibold text-blue-100">Trusted care, faster access</span>
            <h1 className="text-4xl font-semibold leading-tight">Book specialists, manage care, and keep your health on track.</h1>
            <p className="max-w-xl text-slate-300">Find top doctors, compare fees, and schedule appointments with a polished clinic experience built for patients.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/login" className="btn-primary">Sign in</Link>
              <Link to="/register" className="btn-secondary">Create account</Link>
            </div>
          </div>
          <div className="glass-card p-6 text-slate-900">
            <h2 className="text-xl font-semibold mb-4">Search by specialization</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Specialization</label>
                <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Cardiology, Dermatology..." className="input-glass" />
              </div>
              <button onClick={() => fetch(filter)} className="btn-primary w-full">Search doctors</button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {loading && (
          <div className="glass-card p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 p-2"><span className="spinning" /></div>
            <div className="text-lg font-semibold">Loading doctors...</div>
            <p className="text-slate-500">Please wait while we retrieve available healthcare providers.</p>
          </div>
        )}

        {!loading && doctors.map((d:any) => (
          <div key={d.id} className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-blue-700 shadow-sm shadow-blue-600/10 text-2xl">👩‍⚕️</div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{d.user?.name || 'Doctor'}</h3>
                <p className="mt-1 text-sm text-slate-500">{d.specialization}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-100/80 px-4 py-3">
                <span>Consultation fee</span>
                <span className="font-semibold text-slate-900">${d.consultationFee ?? 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-100/80 px-4 py-3">
                <span>Available days</span>
                <span className="font-semibold text-slate-900">{d.availableDays || 'Any'}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to={`/book/${d.id}`} className="btn-primary">Book appointment</Link>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Expert care</span>
            </div>
          </div>
        ))}

        {!loading && doctors.length === 0 && (
          <div className="glass-card col-span-full p-8 text-center text-slate-700">
            <div className="text-xl font-semibold">No doctors found</div>
            <p className="mt-2 text-slate-500">Try a different specialization or refresh to see available providers.</p>
          </div>
        )}
      </div>
    </div>
  )
}
