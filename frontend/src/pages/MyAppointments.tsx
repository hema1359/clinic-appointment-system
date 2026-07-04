import React, { useEffect, useState } from 'react'
import api from '../services/api'

const badgeStyle = (status: string) => {
  if (status === 'PENDING') return 'badge-status bg-yellow-100 text-yellow-800'
  if (status === 'CONFIRMED') return 'badge-status bg-emerald-100 text-emerald-800'
  if (status === 'CANCELLED') return 'badge-status bg-red-100 text-red-800'
  if (status === 'COMPLETED') return 'badge-status bg-blue-100 text-blue-800'
  return 'badge-status bg-slate-100 text-slate-800'
}

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => { setLoading(true); api.get('/appointments/my').then(r => setAppointments(r.data)).finally(()=>setLoading(false)) }, [])

  const cancel = async (id:number) => {
    if (!confirm('Cancel appointment?')) return
    setProcessing(true)
    try {
      await api.put(`/appointments/cancel/${id}`)
      setAppointments(prev => prev.filter(a=>a.id!==id))
    } catch { alert('Failed to cancel') }
    setProcessing(false)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">My appointments</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Your upcoming care schedule</h2>
          </div>
          {processing && <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700"><span className="spinning" /> Updating...</div>}
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-8 text-center">
          <span className="spinning mx-auto mb-4 block" />
          <div className="text-lg font-semibold text-slate-900">Loading appointments...</div>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map(a => (
            <div key={a.id} className="glass-card p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{a.doctor?.user?.name || 'Doctor'}</div>
                  <div className="mt-1 text-sm text-slate-500">{a.slot?.slotDate} · {a.slot?.slotTime}</div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={badgeStyle(a.status)}>{a.status}</span>
                  {a.status !== 'CANCELLED' && a.status !== 'COMPLETED' && (
                    <button onClick={() => cancel(a.id)} className="btn-secondary">Cancel</button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="glass-card p-8 text-center text-slate-700">
              <div className="text-xl font-semibold">No appointments yet</div>
              <p className="mt-2 text-slate-500">Book your first consultation to see it listed here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
