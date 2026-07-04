import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 text-slate-300">
      <div className="container mx-auto grid gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="space-y-3">
          <p className="text-xl font-semibold text-white">ClinicCare</p>
          <p className="max-w-sm text-sm text-slate-400">A modern patient-first platform for booking appointments, managing visits, and keeping all your healthcare details in one place.</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Explore</p>
          <div className="space-y-2 text-sm">
            <Link to="/" className="block text-slate-300 transition hover:text-white">Find doctors</Link>
            <Link to="/login" className="block text-slate-300 transition hover:text-white">Login</Link>
            <Link to="/register" className="block text-slate-300 transition hover:text-white">Create account</Link>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Contact</p>
          <div className="space-y-2 text-sm text-slate-300">
            <p>support@clinicare.com</p>
            <p>+1 (800) 123-4567</p>
            <p>Open Mon-Fri · 8am–6pm</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Clinic hours</p>
          <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300 shadow-inner shadow-slate-900/10">
            <p className="font-semibold text-white">Walk-in and telehealth support</p>
            <p className="mt-3">Mon–Fri: 08:00 – 18:00</p>
            <p>Sat: 09:00 – 14:00</p>
            <p>Sun: Closed</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-slate-950/90 px-4 py-4 text-center text-sm text-slate-500 sm:px-6">
        © 2026 ClinicCare. Secure medical booking with compassionate care.
      </div>
    </footer>
  )
}
