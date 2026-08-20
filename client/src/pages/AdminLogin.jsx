import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import './AdminLogin.css'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // If already logged in, go straight to dashboard
  if (localStorage.getItem('eddie_token')) {
    return <Navigate to="/admin/dashboard" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('eddie_token', data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="material-icons login-brand__icon">delivery_dining</span>
          <div className="login-brand__text">
            <div className="login-brand__name">Eddie's <strong>Delivery</strong></div>
            <div className="login-brand__sub">Admin Portal</div>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to manage your delivery operations.</p>

        {error && (
          <div className="login-error" role="alert">
            <span className="material-icons icon-sm">error_outline</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <div className="login-input-wrap">
              <span className="material-icons login-input-icon">person</span>
              <input
                id="username"
                type="text"
                className="form-input login-input"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <span className="material-icons login-input-icon">lock</span>
              <input
                id="password"
                type="password"
                className="form-input login-input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={loading}
            style={{ marginTop: '8px' }}
          >
            {loading
              ? <><span className="material-icons icon-sm spin">refresh</span> Signing in…</>
              : <><span className="material-icons icon-sm">login</span> Sign In</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}
