import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function BookAppointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await api.post('/appointments/book', { doctorId: Number(id), slotDate: date, slotTime: time, reason })
      navigate('/my-appointments')
    } catch (err:any) {
      setError(err?.response?.data || 'Failed to book')
    } finally { setLoading(false) }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/20 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Appointment booking</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Reserve your consultation time</h2>
          <p className="mt-3 text-slate-600">Choose a date, time and provide the reason for your appointment to secure your visit.</p>
        </div>
        <div className="rounded-3xl bg-blue-100/70 p-5 text-slate-900">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Ready in minutes</div>
          <p className="mt-3 text-sm leading-6">Our integrated schedule will confirm availability and take you straight to your patient dashboard when complete.</p>
        </div>
      </div>

      {error && <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={submit} className="grid gap-4">
        <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="input-glass" />
        <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="input-glass" />
        <textarea required rows={5} className="input-glass" value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason for appointment" />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <span className="flex items-center justify-center gap-2"><span className="spinning" /> Booking appointment...</span> : 'Confirm appointment'}
        </button>
      </form>
    </div>
  )
}
