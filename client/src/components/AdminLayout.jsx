import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './AdminLayout.css'

const NAV_ITEMS = [
  { to: '/admin/dashboard',   icon: 'dashboard',    label: 'Dashboard' },
  { to: '/admin/errands',     icon: 'assignment',   label: 'Errands' },
  { to: '/admin/restaurants', icon: 'store',        label: 'Restaurants' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('eddie_token')
    navigate('/admin')
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="material-icons admin-sidebar__logo-icon">delivery_dining</span>
          <div>
            <div className="admin-sidebar__brand-name">Eddie's</div>
            <div className="admin-sidebar__brand-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
              }
            >
              <span className="material-icons">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-sidebar__logout" onClick={logout}>
          <span className="material-icons">logout</span>
          Log Out
        </button>
      </aside>

      {/* Main content area */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
