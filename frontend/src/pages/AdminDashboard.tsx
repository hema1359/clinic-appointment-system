import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function AdminDashboard(){
  const [stats, setStats] = useState<any>(null)
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)
    const s = await api.get('/admin/dashboard/stats').then(r=>r.data).catch(()=>null)
    setStats(s)
    const d = await api.get('/admin/doctors').then(r=>r.data).catch(()=>[])
    setDoctors(d)
    setLoading(false)
  }

  useEffect(()=>{ fetch() }, [])

  const del = async (id:number) => { await api.delete(`/admin/doctors/${id}`); fetch() }

  return (
    <div className="space-y-8">
      <div className="glass-card p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Admin panel</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Manage the clinic network</h2>
        <p className="mt-4 max-w-2xl text-slate-600">Monitor doctors, patients, and appointments with a clean administrative dashboard built for clarity.</p>
      </div>

      {loading ? (
        <div className="glass-card p-8 text-center">
          <span className="spinning mx-auto mb-4 block" />
          <div className="text-lg font-semibold text-slate-900">Loading dashboard metrics...</div>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="glass-card p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Doctors</div>
            <div className="mt-4 text-4xl font-semibold text-slate-900">{stats?.doctors ?? '—'}</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Patients</div>
            <div className="mt-4 text-4xl font-semibold text-slate-900">{stats?.patients ?? '—'}</div>
          </div>
          <div className="glass-card p-6">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Appointments</div>
            <div className="mt-4 text-4xl font-semibold text-slate-900">{stats?.appointments ?? '—'}</div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-slate-900">Doctors</h3>
        <div className="grid gap-4">
          {doctors.map(d => (
            <div key={d.id} className="glass-card p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-semibold text-slate-900">{d.user?.name || 'Doctor'}</div>
                <div className="mt-1 text-sm text-slate-500">{d.specialization}</div>
              </div>
              <button onClick={()=>del(d.id)} className="btn-secondary">Delete</button>
            </div>
          ))}
          {doctors.length === 0 && <div className="glass-card p-8 text-center text-slate-700">No doctors available yet.</div>}
        </div>
      </div>
    </div>
  )
}
