import { useEffect, useState, useCallback } from 'react'
import { apiUrl, authHeaders } from '../../api'

const API = apiUrl('/api/errands')
const authHeader = () => authHeaders()

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed', 'Cancelled']
const STATUS_CHIP = {
  'Pending':     'chip chip--pending',
  'In Progress': 'chip chip--progress',
  'Completed':   'chip chip--completed',
  'Cancelled':   'chip chip--cancelled',
}

function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="material-icons icon-sm">{t.type === 'success' ? 'check_circle' : 'error'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  )
}

export default function Errands() {
  const [rows, setRows]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('All')
  const [toasts, setToasts]     = useState([])
  const [deleting, setDeleting] = useState(null)

  const toast = (msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(API, { headers: authHeader() })
    const data = await res.json()
    setRows(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id, status) {
    await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: authHeader(),
      body: JSON.stringify({ status }),
    })
    setRows(r => r.map(x => x.id === id ? { ...x, status } : x))
    toast(`Status updated to "${status}"`)
  }

  async function deleteRow(id) {
    setDeleting(id)
    await fetch(`${API}/${id}`, { method: 'DELETE', headers: authHeader() })
    setRows(r => r.filter(x => x.id !== id))
    setDeleting(null)
    toast('Errand deleted', 'error')
  }

  const filtered = rows
    .filter(r => filter === 'All' || r.status === filter)
    .filter(r => {
      const q = search.toLowerCase()
      return !q || [r.name, r.phone, r.email, r.pickup, r.dropoff, r.description]
        .some(f => (f || '').toLowerCase().includes(q))
    })

  return (
    <div>
      <Toast toasts={toasts} />

      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <span className="material-icons">assignment</span>
          Errand Requests
        </h1>
        <p className="admin-page-sub">{rows.length} total requests</p>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="material-icons">search</span>
          <input
            placeholder="Search by name, phone, location…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`btn btn--sm ${filter === s ? 'btn--primary' : 'btn--ghost'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons">inbox</span>
            <p>No errand requests found.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Pickup</th>
                  <th>Drop-off</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{r.id}</td>
                    <td>
                      <strong>{r.name}</strong><br />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.phone}</span>
                      {r.email && <><br /><span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.email}</span></>}
                    </td>
                    <td>{r.pickup}</td>
                    <td>{r.dropoff}</td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'normal', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {r.description}
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={r.status}
                        onChange={e => updateStatus(r.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn--ghost btn--sm"
                        style={{ color: 'var(--error)', borderColor: 'transparent' }}
                        onClick={() => deleteRow(r.id)}
                        disabled={deleting === r.id}
                        title="Delete"
                      >
                        <span className="material-icons icon-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
