import React, { useEffect, useState } from 'react'
import api from '../services/api'

const badgeStyle = (status: string) => {
  if (status === 'PENDING') return 'badge-status bg-yellow-100 text-yellow-800'
  if (status === 'CONFIRMED') return 'badge-status bg-emerald-100 text-emerald-800'
  if (status === 'CANCELLED') return 'badge-status bg-red-100 text-red-800'
  if (status === 'COMPLETED') return 'badge-status bg-blue-100 text-blue-800'
  return 'badge-status bg-slate-100 text-slate-800'
}

export default function DoctorDashboard(){
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchAppointments = () => {
    setLoading(true)
    api.get('/doctor/appointments').then(r => setAppointments(r.data)).catch(()=>setAppointments([])).finally(()=>setLoading(false))
  }

  useEffect(() => { fetchAppointments() }, [])

  const confirm = async (id:number) => { await api.put(`/doctor/appointments/confirm/${id}`); fetchAppointments() }
  const complete = async (id:number) => { await api.put(`/doctor/appointments/complete/${id}`); fetchAppointments() }

  return (
    <div className="space-y-8">
      <div className="glass-card p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Doctor dashboard</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Care coordination in one place</h2>
          </div>
          <div className="rounded-3xl bg-blue-100/80 px-5 py-4 text-slate-900 shadow-sm">
            <div className="text-sm uppercase tracking-[0.18em] text-blue-700">Appointments</div>
            <div className="mt-2 text-3xl font-semibold">{appointments.length}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-8 text-center">
          <span className="spinning mx-auto mb-4 block" />
          <div className="text-lg font-semibold text-slate-900">Loading patient requests...</div>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map(a => (
            <div key={a.id} className="glass-card p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{a.patient?.name || a.patient?.email}</div>
                  <div className="mt-1 text-sm text-slate-500">{a.slot?.slotDate} · {a.slot?.slotTime}</div>
                </div>
                <div className={badgeStyle(a.status)}>{a.status}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {a.status === 'PENDING' && <button onClick={() => confirm(a.id)} className="btn-primary">Confirm</button>}
                {a.status !== 'COMPLETED' && <button onClick={() => complete(a.id)} className="btn-secondary">Mark completed</button>}
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="glass-card p-8 text-center text-slate-700">
              <div className="text-xl font-semibold">No appointments yet</div>
              <p className="mt-2 text-slate-500">Once patients book a consultation, it will appear here for review.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
