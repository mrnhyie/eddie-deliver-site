import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('eddie_token')
  return token ? children : <Navigate to="/admin" replace />
}
