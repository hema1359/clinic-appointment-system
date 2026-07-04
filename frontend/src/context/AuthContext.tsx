import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

type User = { id: number; name: string; email: string; role: string }

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      api.get('/auth/me').then(r => setUser(r.data)).catch(()=>{ setUser(null) })
    } else {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      setUser(null)
    }
  }, [token])

  const login = (t: string) => {
    setToken(t)
    localStorage.setItem('token', t)
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`
  }

  const logout = () => { setToken(null); setUser(null) }

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
