import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SERVICE_TYPES = ['Food Delivery Only', 'Errands & Delivery', 'Both', 'Other']

export default function RestaurantPartner() {
  const [form, setForm] = useState({
    restaurant_name: '', contact_name: '', phone: '', email: '',
    location: '', service_type: '', message: '',
  })
  const [status, setStatus] = useState(null)
  const [errMsg, setErrMsg] = useState('')

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch('http://localhost:3001/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setStatus('success')
      setForm({ restaurant_name: '', contact_name: '', phone: '', email: '', location: '', service_type: '', message: '' })
    } catch (err) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="page-wrap">
      <Navbar />

      {/* Hero banner */}
      <section className="rp-hero">
        <div className="container rp-hero__inner">
          <div className="rp-hero__text">
            <div className="section-eyebrow" style={{ color: 'var(--orange-light)' }}>For Restaurants</div>
            <h1 className="section-title" style={{ color: '#fff' }}>Grow your delivery business</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '480px', lineHeight: '1.7' }}>
              Join Eddie's growing network. No platform commissions eating your margins — just reliable, personal delivery service.
            </p>
            <ul className="rp-perks">
              {['No platform commissions', 'Flexible scheduling', 'Direct communication', 'Local & trusted'].map(p => (
                <li key={p}><span className="material-icons icon-sm" style={{ color: 'var(--lime-light)' }}>check_circle</span> {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="section-eyebrow">Partnership Inquiry</div>
          <h2 className="section-title">Tell us about your restaurant</h2>

          {status === 'success' ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px 32px', marginTop: '24px' }}>
              <span className="material-icons" style={{ fontSize: '56px', color: 'var(--lime)', marginBottom: '16px' }}>store</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '10px' }}>Inquiry Received!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Eddie will reach out within 24 hours to discuss the partnership details.
              </p>
              <button className="btn btn--primary" onClick={() => setStatus(null)}>Submit Another</button>
            </div>
          ) : (
            <form className="card" style={{ marginTop: '24px' }} onSubmit={handleSubmit} noValidate>
              {status === 'error' && (
                <div className="login-error" style={{ marginBottom: '20px' }}>
                  <span className="material-icons icon-sm">error_outline</span>
                  {errMsg}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="rp-rname">Restaurant Name *</label>
                    <input id="rp-rname" className="form-input" placeholder="Maria's Kitchen" required value={form.restaurant_name} onChange={set('restaurant_name')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="rp-cname">Your Name *</label>
                    <input id="rp-cname" className="form-input" placeholder="Maria García" required value={form.contact_name} onChange={set('contact_name')} />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="rp-phone">Phone *</label>
                    <input id="rp-phone" className="form-input" type="tel" placeholder="+1 (555) 000-0000" required value={form.phone} onChange={set('phone')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="rp-email">Email *</label>
                    <input id="rp-email" className="form-input" type="email" placeholder="maria@kitchen.com" required value={form.email} onChange={set('email')} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rp-location">Restaurant Location *</label>
                  <input id="rp-location" className="form-input" placeholder="123 Main St, City, State" required value={form.location} onChange={set('location')} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rp-service">Service Type</label>
                  <select id="rp-service" className="form-select" value={form.service_type} onChange={set('service_type')}>
                    <option value="">Select a service type…</option>
                    {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="rp-message">Tell us about your needs</label>
                  <textarea
                    id="rp-message"
                    className="form-textarea"
                    placeholder="How many deliveries per day? Any special requirements or delivery zones?"
                    value={form.message}
                    onChange={set('message')}
                  />
                </div>

                <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? <><span className="material-icons icon-sm spin">refresh</span> Submitting…</>
                    : <><span className="material-icons icon-sm">send</span> Send Inquiry</>
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
