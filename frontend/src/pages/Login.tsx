import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const getDashboardPath = (role: string) => {
  if (role === 'PATIENT') return '/dashboard'
  if (role === 'DOCTOR') return '/doctor'
  if (role === 'ADMIN') return '/admin'
  return '/'
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    navigate(getDashboardPath(user.role))
  }, [user, navigate])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.token)
      const me = await api.get('/auth/me')
      navigate(getDashboardPath(me.data.role))
    } catch (err:any) {
      setError(err?.response?.data || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
      <div className="space-y-6 text-white">
        <span className="inline-flex rounded-full bg-blue-100/20 px-4 py-2 text-sm font-semibold text-blue-100">Welcome back</span>
        <h1 className="text-4xl font-semibold leading-tight">Secure clinic access with a polished healthcare experience.</h1>
        <p className="max-w-xl text-slate-200">Sign in to manage appointments, chat with doctors, and track your care with a modern medical portal.</p>
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-xl shadow-slate-900/10">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-300">Benefits</div>
          <ul className="space-y-3 text-slate-200">
            <li>• Instant appointment booking</li>
            <li>• Personalized patient dashboard</li>
            <li>• Secure medical access and scheduling</li>
          </ul>
        </div>
      </div>
      <div className="glass-card p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-3 text-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-white">🩺</div>
          <div>
            <div className="text-lg font-semibold">Patient login</div>
            <div className="text-sm text-slate-500">Secure access to your medical dashboard</div>
          </div>
        </div>

        {error && <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-glass" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-glass" />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <span className="flex items-center justify-center gap-2"><span className="spinning" /> Signing in...</span> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
