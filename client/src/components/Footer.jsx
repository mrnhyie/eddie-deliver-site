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
            <p className="footer__tagline">Fast, personal, community-first delivery.</p>
          </div>
        </div>
        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/request-errand">Request Errand</Link>
          <Link to="/restaurant">Restaurant Partners</Link>
        </nav>
        <div className="footer__contact">
          <a href="tel:+15550000000">
            <span className="material-icons icon-sm">phone</span> +1 (555) 000-0000
          </a>
          <a href="mailto:eddie@eddiesdelivery.com">
            <span className="material-icons icon-sm">email</span> eddie@eddiesdelivery.com
          </a>
        </div>
        <p className="footer__copy">© 2026 Eddie's Delivery · All rights reserved</p>
      </div>
    </footer>
  )
}
