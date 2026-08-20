import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="page-wrap">
      <Navbar />

      {/* Hero with Delivery Background Video */}
      <section className="home-hero">
        {/* Background Video */}
        <div className="home-hero__video-wrap" aria-hidden="true">
          <video
            className="home-hero__video"
            autoPlay
            loop
            muted
            playsInline
            poster="/hero.png"
          >
            <source src="/hero-delivery.mp4" type="video/mp4" />
          </video>
          <div className="home-hero__video-overlay" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="home-hero__orbs" aria-hidden="true">
          <div className="home-hero__orb home-hero__orb--1" />
          <div className="home-hero__orb home-hero__orb--2" />
        </div>

        <div className="container home-hero__content">
          <div className="home-hero__text">
            <h1 className="home-hero__title">
              Your neighborhood<br />
              <span className="home-hero__title-accent">delivery partner</span>
            </h1>

            <p className="home-hero__sub">
              Eddie's Delivery connects local restaurants with hungry customers. Fast deliveries,
              personal service, and custom errands — with zero platform commissions.
            </p>

            <div className="home-hero__actions">
              <Link to="/restaurant" className="btn btn--primary btn--lg">
                <span className="material-icons icon-sm">storefront</span>
                Partner With Us
                <span className="material-icons icon-sm btn-arrow">arrow_forward</span>
              </Link>
              <Link to="/request-errand" className="btn btn--outline btn--lg home-hero__btn-outline">
                <span className="material-icons icon-sm">local_shipping</span>
                Request an Errand
              </Link>
            </div>

            <div className="home-hero__stats">
              <div className="home-stat">
                <span className="home-stat__num">30<span className="home-stat__unit">min</span></span>
                <span className="home-stat__label">Avg. Delivery</span>
              </div>
              <div className="home-stat__divider" />
              <div className="home-stat">
                <span className="home-stat__num">100<span className="home-stat__unit">%</span></span>
                <span className="home-stat__label">Commitment</span>
              </div>
              <div className="home-stat__divider" />
              <div className="home-stat">
                <span className="home-stat__num">24<span className="home-stat__unit">/7</span></span>
                <span className="home-stat__label">Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS INTRO HEADER & QUICK NAV */}
      <section className="ops-overview-header section" id="operations">
        <div className="container text-center">
          <div className="section-eyebrow ops-badge">
            <span className="material-icons icon-sm">sync_alt</span>
            End-to-End Workflow
          </div>
          <h2 className="section-title">How Our Operations Work</h2>
          <p className="section-subtitle" style={{ marginInline: 'auto' }}>
            From the kitchen grill to the customer doorstep — explore how our 4-stage delivery pipeline guarantees freshness, speed, and precision.
          </p>

          <div className="ops-quick-nav">
            <a href="#stage-01" className="ops-nav-chip">
              <span className="ops-nav-num">01</span>
              <span>Order Sync &amp; Dispatch</span>
            </a>
            <a href="#stage-02" className="ops-nav-chip">
              <span className="ops-nav-num">02</span>
              <span>Thermal Packing</span>
            </a>
            <a href="#stage-03" className="ops-nav-chip">
              <span className="ops-nav-num">03</span>
              <span>Smart Transit</span>
            </a>
            <a href="#stage-04" className="ops-nav-chip">
              <span className="ops-nav-num">04</span>
              <span>Friendly Hand-off</span>
            </a>
          </div>
        </div>
      </section>

      {/* =============================================
          STAGE 01: ORDER SYNC & INSTANT DISPATCH
          ============================================= */}
      <section className="stage-section stage-section--light" id="stage-01">
        <div className="container">
          <div className="stage-grid">
            <div className="stage-content">
              <div className="stage-pill stage-pill--orange">
                <span className="material-icons icon-sm">notifications_active</span>
                Stage 01 · 0-2 mins
              </div>
              <h3 className="stage-title">Order Sync &amp; Instant Dispatch</h3>
              <p className="stage-desc">
                The moment a restaurant receives an order or a client books an errand, our smart dispatch system calculates the optimal pickup window and alerts Eddie with instant route telemetry.
              </p>

              <div className="stage-points">
                <div className="stage-point">
                  <span className="material-icons stage-point__icon">check_circle</span>
                  <div>
                    <strong>Direct Kitchen Communication</strong>
                    <p>No waiting on third-party aggregators — Eddie syncs directly with the kitchen expediter.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon">check_circle</span>
                  <div>
                    <strong>Instant Route Mapping</strong>
                    <p>Automated telemetry matches live street conditions for the fastest arrival time.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon">check_circle</span>
                  <div>
                    <strong>Zero Middleman Lag</strong>
                    <p>Orders are claimed in seconds, eliminating cold food sitting on pickup shelves.</p>
                  </div>
                </div>
              </div>

              <div className="stage-footer">
                <div className="stage-metric">
                  <span className="stage-metric__num">&lt; 2<span className="stage-metric__unit">min</span></span>
                  <span className="stage-metric__lbl">Average Dispatch Window</span>
                </div>
                <Link to="/restaurant" className="btn btn--primary">
                  <span className="material-icons icon-sm">storefront</span>
                  Partner Your Kitchen
                  <span className="material-icons icon-sm btn-arrow">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="stage-visual">
              <div className="stage-img-wrapper">
                <img
                  src="/operations/stage1-order-dispatch.jpg"
                  alt="Professional Black chef and restaurant manager reviewing incoming order on tablet"
                  className="stage-img"
                  loading="lazy"
                />
                <div className="stage-floating-chip stage-floating-chip--orange">
                  <span className="material-icons icon-sm">restaurant_menu</span>
                  <div>
                    <strong>Kitchen Sync &amp; Dispatch</strong>
                    <span>Ticket #4028 · Dispatched</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          STAGE 02: THERMAL PACKING & QUALITY CHECK
          ============================================= */}
      <section className="stage-section stage-section--surface" id="stage-02">
        <div className="container">
          <div className="stage-grid stage-grid--reverse">
            <div className="stage-visual">
              <div className="stage-img-wrapper">
                <img
                  src="/operations/stage2-thermal-packing.jpg"
                  alt="Smiling Black courier inspecting fresh packaged meals inside insulated thermal delivery bag at restaurant counter"
                  className="stage-img"
                  loading="lazy"
                />
                <div className="stage-floating-chip stage-floating-chip--lime">
                  <span className="material-icons icon-sm">verified</span>
                  <div>
                    <strong>Temp-Controlled Care</strong>
                    <span>Insulated &amp; Sealed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stage-content">
              <div className="stage-pill stage-pill--lime">
                <span className="material-icons icon-sm">verified_user</span>
                Stage 02 · 5-10 mins
              </div>
              <h3 className="stage-title">Thermal Packing &amp; Quality Check</h3>
              <p className="stage-desc">
                Eddie arrives on-site right as the order finishes cooking. Every package is cross-checked against the manifest and placed inside professional temperature-insulated carriers.
              </p>

              <div className="stage-points">
                <div className="stage-point">
                  <span className="material-icons stage-point__icon stage-point__icon--lime">check_circle</span>
                  <div>
                    <strong>Itemized Manifest Verification</strong>
                    <p>Every sauce, side, and special instruction is verified before sealing the bag.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon stage-point__icon--lime">check_circle</span>
                  <div>
                    <strong>Hot &amp; Cold Dual Zones</strong>
                    <p>Thermal compartments ensure hot meals stay steaming and chilled items remain crisp.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon stage-point__icon--lime">check_circle</span>
                  <div>
                    <strong>Secure Spill-Proof Handling</strong>
                    <p>Specialized stabilization straps protect delicate containers during transport.</p>
                  </div>
                </div>
              </div>

              <div className="stage-footer">
                <div className="stage-metric">
                  <span className="stage-metric__num">100<span className="stage-metric__unit">%</span></span>
                  <span className="stage-metric__lbl">Sealed &amp; Insulated</span>
                </div>
                <Link to="/request-errand" className="btn btn--lime">
                  <span className="material-icons icon-sm">inventory_2</span>
                  Request Errand Pickup
                  <span className="material-icons icon-sm btn-arrow">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          STAGE 03: SMART TRANSIT & ROUTE OPTIMIZATION
          ============================================= */}
      <section className="stage-section stage-section--light" id="stage-03">
        <div className="container">
          <div className="stage-grid">
            <div className="stage-content">
              <div className="stage-pill stage-pill--blue">
                <span className="material-icons icon-sm">alt_route</span>
                Stage 03 · 10-20 mins
              </div>
              <h3 className="stage-title">Smart Transit &amp; Route Optimization</h3>
              <p className="stage-desc">
                Hyper-local navigation through neighborhood shortcuts to bypass peak traffic. Dedicated point-to-point delivery means no multi-order stacking delays.
              </p>

              <div className="stage-points">
                <div className="stage-point">
                  <span className="material-icons stage-point__icon stage-point__icon--blue">check_circle</span>
                  <div>
                    <strong>Local Street Expertise</strong>
                    <p>In-depth neighborhood knowledge avoids arterial bottlenecks, school zones, and construction.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon stage-point__icon--blue">check_circle</span>
                  <div>
                    <strong>Direct Point-to-Point Transit</strong>
                    <p>Your order travels straight from pickup to destination without zigzagging across town.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon stage-point__icon--blue">check_circle</span>
                  <div>
                    <strong>Real-Time ETA Transparency</strong>
                    <p>Accurate live updates keep the customer and restaurant informed every minute.</p>
                  </div>
                </div>
              </div>

              <div className="stage-footer">
                <div className="stage-metric">
                  <span className="stage-metric__num">Point<span className="stage-metric__unit">-to-</span>Point</span>
                  <span className="stage-metric__lbl">Zero Multi-Order Stacking</span>
                </div>
                <Link to="/request-errand" className="btn btn--primary">
                  <span className="material-icons icon-sm">speed</span>
                  Book Express Transit
                  <span className="material-icons icon-sm btn-arrow">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="stage-visual">
              <div className="stage-img-wrapper">
                <img
                  src="/operations/stage3-smart-transit.jpg"
                  alt="Focused Black courier riding electric scooter in city street at golden hour with courier backpack"
                  className="stage-img"
                  loading="lazy"
                />
                <div className="stage-floating-chip stage-floating-chip--blue">
                  <span className="material-icons icon-sm">navigation</span>
                  <div>
                    <strong>Live Route Optimization</strong>
                    <span>Express Neighborhood Lane</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          STAGE 04: FRIENDLY HAND-OFF & LIVE PROOF
          ============================================= */}
      <section className="stage-section stage-section--surface" id="stage-04">
        <div className="container">
          <div className="stage-grid stage-grid--reverse">
            <div className="stage-visual">
              <div className="stage-img-wrapper">
                <img
                  src="/operations/stage4-doorstep-handoff.jpg"
                  alt="Friendly Black courier handing fresh food delivery bag to happy smiling Black customer at modern home doorstep"
                  className="stage-img"
                  loading="lazy"
                />
                <div className="stage-floating-chip stage-floating-chip--orange">
                  <span className="material-icons icon-sm">home</span>
                  <div>
                    <strong>Doorstep Delivery &amp; Proof</strong>
                    <span>Delivered With a Smile</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stage-content">
              <div className="stage-pill stage-pill--orange">
                <span className="material-icons icon-sm">sentiment_very_satisfied</span>
                Stage 04 · Completed
              </div>
              <h3 className="stage-title">Friendly Hand-off &amp; Live Proof</h3>
              <p className="stage-desc">
                No anonymous gig-workers. Eddie delivers each order personally with courteous presentation, contactless options, and live photo confirmation sent back to the restaurant partner.
              </p>

              <div className="stage-points">
                <div className="stage-point">
                  <span className="material-icons stage-point__icon">check_circle</span>
                  <div>
                    <strong>Courteous, Professional Presentation</strong>
                    <p>A warm neighborhood face representing your restaurant with professionalism and pride.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon">check_circle</span>
                  <div>
                    <strong>Contactless &amp; Custom Drop-off Options</strong>
                    <p>Delivered exactly where requested — doorstep bench, front desk, or handed directly.</p>
                  </div>
                </div>
                <div className="stage-point">
                  <span className="material-icons stage-point__icon">check_circle</span>
                  <div>
                    <strong>Instant Digital Receipt &amp; Photo Proof</strong>
                    <p>Live confirmation timestamp and photo proof transmitted immediately upon hand-off.</p>
                  </div>
                </div>
              </div>

              <div className="stage-footer">
                <div className="stage-metric">
                  <span className="stage-metric__num">5.0<span className="stage-metric__unit">★</span></span>
                  <span className="stage-metric__lbl">Customer Satisfaction</span>
                </div>
                <Link to="/restaurant" className="btn btn--primary">
                  <span className="material-icons icon-sm">handshake</span>
                  Join As A Partner
                  <span className="material-icons icon-sm btn-arrow">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="section">
        <div className="container">
          <div className="section-eyebrow text-center">
            <span className="material-icons icon-sm" style={{ verticalAlign: 'middle', marginRight: '4px' }}>category</span>
            What We Do
          </div>
          <h2 className="section-title text-center">More than just food delivery</h2>
          <p className="section-subtitle text-center" style={{ marginInline: 'auto' }}>
            Eddie handles food deliveries, custom errands, and restaurant partnerships across the area.
          </p>
          
          <div className="home-services">
            {[
              { 
                icon: 'restaurant', 
                title: 'Food Delivery', 
                features: ['Real-time order tracking', 'Insulated hot/cold bags', 'On-time arrival guarantee'] 
              },
              { 
                icon: 'inventory_2', 
                title: 'Errands & Pickups', 
                features: ['Grocery store runs', 'Pharmacy pickups', 'Custom courier errands'], 
                featured: true 
              },
              { 
                icon: 'storefront', 
                title: 'Restaurant Partnerships', 
                features: ['Zero platform commission', 'Direct driver contact', 'Flexible scheduling'] 
              },
            ].map((s, i) => (
              <div key={i} className={`home-service-card ${s.featured ? 'home-service-card--featured' : ''}`}>
                {s.featured && (
                  <div className="home-service-badge">
                    <span className="material-icons icon-sm" style={{ fontSize: '14px' }}>star</span>
                    Most Popular
                  </div>
                )}
                <div className="home-service-icon">
                  <span className="material-icons">{s.icon}</span>
                </div>
                <h3 className="home-service-title">{s.title}</h3>
                <ul className="home-service-features">
                  {s.features.map(f => (
                    <li key={f}>
                      <span className="material-icons icon-sm home-check-icon">check_circle</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section home-cta-section">
        <div className="container home-cta">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--orange-light)', marginBottom: '12px' }}>
            <span className="material-icons">rocket_launch</span>
            <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8rem' }}>Get Started Today</span>
          </div>
          <h2 className="section-title" style={{ color: '#fff' }}>Ready to get started?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '32px', maxWidth: '540px', marginInline: 'auto' }}>
            Join Eddie's growing restaurant network or request your first errand today.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/restaurant" className="btn btn--lg btn--white-clean">
              <span className="material-icons icon-sm">storefront</span>
              Partner With Us
              <span className="material-icons icon-sm btn-arrow">arrow_forward</span>
            </Link>
            <Link to="/request-errand" className="btn btn--outline btn--lg home-cta__btn-outline">
              <span className="material-icons icon-sm">add_task</span>
              Request an Errand
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
