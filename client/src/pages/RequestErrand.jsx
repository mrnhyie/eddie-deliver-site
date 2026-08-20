import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RequestErrand() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', pickup: '', dropoff: '', description: '',
  })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('')

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('http://localhost:3001/api/errands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setStatus('success')
      setForm({ name: '', phone: '', email: '', pickup: '', dropoff: '', description: '' })
    } catch (err) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="page-wrap">
      <Navbar />

      <section className="section">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="section-eyebrow">Quick &amp; Easy</div>
          <h1 className="section-title">Request an Errand</h1>
          <p className="section-subtitle" style={{ marginBottom: '36px' }}>
            Fill out the form below and Eddie will be in touch to confirm your errand details.
          </p>

          {status === 'success' ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
              <span className="material-icons" style={{ fontSize: '56px', color: 'var(--lime)', marginBottom: '16px' }}>check_circle</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '10px' }}>Request Submitted!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Thanks! Eddie will contact you shortly to confirm your errand.
              </p>
              <button className="btn btn--primary" onClick={() => setStatus(null)}>Submit Another</button>
            </div>
          ) : (
            <form className="card" onSubmit={handleSubmit} noValidate>
              {status === 'error' && (
                <div className="login-error" style={{ marginBottom: '20px' }}>
                  <span className="material-icons icon-sm">error_outline</span>
                  {errMsg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="er-name">Full Name *</label>
                    <input id="er-name" className="form-input" placeholder="Kwame Mensah" required value={form.name} onChange={set('name')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="er-phone">Phone Number *</label>
                    <input id="er-phone" className="form-input" type="tel" placeholder="+233 54 901 4359" required value={form.phone} onChange={set('phone')} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="er-email">Email (optional)</label>
                  <input id="er-email" className="form-input" type="email" placeholder="kwame@example.com" value={form.email} onChange={set('email')} />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="er-pickup">Pickup Location (Ghana) *</label>
                    <input id="er-pickup" className="form-input" placeholder="e.g. Oxford Street, Osu, Accra" required value={form.pickup} onChange={set('pickup')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="er-dropoff">Drop-off Location (Ghana) *</label>
                    <input id="er-dropoff" className="form-input" placeholder="e.g. Lagos Avenue, East Legon" required value={form.dropoff} onChange={set('dropoff')} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="er-desc">Errand Description *</label>
                  <textarea
                    id="er-desc"
                    className="form-textarea"
                    placeholder="Describe what you need — groceries, pharmacy pickup, food order, etc."
                    required
                    value={form.description}
                    onChange={set('description')}
                    style={{ minHeight: '120px' }}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? <><span className="material-icons icon-sm spin">refresh</span> Submitting…</>
                    : <><span className="material-icons icon-sm">send</span> Submit Request</>
                  }
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />

      <style>{`.spin { animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
