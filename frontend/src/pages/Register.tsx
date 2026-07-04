import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await api.post('/auth/register', { name, email, password, phone })
      setMessage('Registration successful. Redirecting to login...')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err:any) {
      setMessage(err?.response?.data || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
      <div className="space-y-6 text-white">
        <span className="inline-flex rounded-full bg-blue-100/20 px-4 py-2 text-sm font-semibold text-blue-100">Join the clinic network</span>
        <h1 className="text-4xl font-semibold leading-tight">Create your account and access medical bookings instantly.</h1>
        <p className="max-w-xl text-slate-200">Register for a modern patient portal that simplifies booking and care coordination for every visit.</p>
      </div>
      <div className="glass-card p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-3 text-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-white">🏥</div>
          <div>
            <div className="text-lg font-semibold">Create account</div>
            <div className="text-sm text-slate-500">Start your medical booking journey</div>
          </div>
        </div>

        {message && <div className="mb-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-700">{message}</div>}

        <form onSubmit={submit} className="space-y-4">
          <input type="text" required placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="input-glass" />
          <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-glass" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-glass" />
          <input type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value)} className="input-glass" />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <span className="flex items-center justify-center gap-2"><span className="spinning" /> Creating account...</span> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}
