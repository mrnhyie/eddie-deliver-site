import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="material-icons footer__icon">delivery_dining</span>
          <div>
            <div className="footer__name">Eddie's <strong>Delivery</strong></div>
            <p className="footer__tagline">Fast, personal, community-first delivery in Ghana 🇬🇭.</p>
          </div>
        </div>
        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/request-errand">Request Errand</Link>
          <Link to="/restaurant">Restaurant Partners</Link>
        </nav>
        <div className="footer__contact">
          <a href="tel:+233549014359" title="Call Eddie">
            <span className="material-icons icon-sm">phone</span> +233 54 901 4359
          </a>
          <a href="https://wa.me/233549014359" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" style={{ color: 'var(--lime-dark)', fontWeight: 600 }}>
            <span className="material-icons icon-sm">chat</span> WhatsApp: +233 54 901 4359
          </a>
          <a href="mailto:eddie@eddiesdelivery.com">
            <span className="material-icons icon-sm">email</span> eddie@eddiesdelivery.com
          </a>
        </div>
        <p className="footer__copy">© 2026 Eddie's Delivery · Greater Accra, Ghana · All rights reserved</p>
      </div>
    </footer>
  )
}
