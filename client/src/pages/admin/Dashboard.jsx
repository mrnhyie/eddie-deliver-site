import { useEffect, useState } from 'react'

function api(path) {
  return fetch(`http://localhost:3001/api${path}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('eddie_token')}` },
  }).then(r => r.json())
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentErrands, setRecentErrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [errands, restaurants] = await Promise.all([
        api('/errands'),
        api('/restaurants'),
      ])
      const count = (arr, status) => arr.filter(r => r.status === status).length
      setStats({
        totalErrands:      errands.length,
        pendingErrands:    count(errands, 'Pending'),
        completedErrands:  count(errands, 'Completed'),
        totalRestaurants:  restaurants.length,
        newRestaurants:    count(restaurants, 'New'),
        partneredRest:     count(restaurants, 'Partnered'),
      })
      setRecentErrands(errands.slice(0, 5))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ color: 'var(--text-muted)', marginTop: '60px', textAlign: 'center' }}>Loading…</p>

  const STATUS_CHIP = {
    'Pending':     'chip chip--pending',
    'In Progress': 'chip chip--progress',
    'Completed':   'chip chip--completed',
    'Cancelled':   'chip chip--cancelled',
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <span className="material-icons">dashboard</span>
          Dashboard
        </h1>
        <p className="admin-page-sub">Overview of your delivery operations.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon--orange">
            <span className="material-icons">assignment</span>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalErrands}</div>
            <div className="stat-label">Total Errands</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--blue">
            <span className="material-icons">pending_actions</span>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.pendingErrands}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--lime">
            <span className="material-icons">task_alt</span>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.completedErrands}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--orange">
            <span className="material-icons">store</span>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalRestaurants}</div>
            <div className="stat-label">Restaurant Leads</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--red">
            <span className="material-icons">fiber_new</span>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.newRestaurants}</div>
            <div className="stat-label">New Inquiries</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon stat-icon--lime">
            <span className="material-icons">handshake</span>
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.partneredRest}</div>
            <div className="stat-label">Partners</div>
          </div>
        </div>
      </div>

      {/* Recent Errands */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Errand Requests</h2>
          <a href="/admin/errands" className="btn btn--ghost btn--sm">View all</a>
        </div>

        {recentErrands.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons">inbox</span>
            <p>No errand requests yet.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Pickup</th>
                  <th>Drop-off</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentErrands.map(e => (
                  <tr key={e.id}>
                    <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>#{e.id}</td>
                    <td><strong>{e.name}</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{e.phone}</span></td>
                    <td>{e.pickup}</td>
                    <td>{e.dropoff}</td>
                    <td><span className={STATUS_CHIP[e.status] || 'chip'}>{e.status}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(e.created_at).toLocaleDateString()}
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
