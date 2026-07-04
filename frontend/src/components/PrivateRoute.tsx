import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children, roles }: { children: JSX.Element, roles?: string[] }){
  const { token, user } = useAuth()
  if (!token) return <Navigate to="/login" />
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/" />
  return children
}
