/**
 * Same-origin API — works for Vite proxy (dev) and Vercel monolith (prod).
 * Do not set VITE_API_URL when frontend and API share one domain.
 */
export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  return p.startsWith('/api') ? p : `/api${p}`
}

export function authHeaders(extra = {}) {
  const token = localStorage.getItem('eddie_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  }
}
