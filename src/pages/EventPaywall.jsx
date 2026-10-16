import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { events, getEventBySlug } from '../data/events';
import Footer from '../components/Footer';
import './EventPaywall.css';

export default function EventPaywall() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug) || events[0];

  const defaultTier = event.tiers.find(t => t.popular) || event.tiers[0];
  const [selectedTier, setSelectedTier] = useState(defaultTier);
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('apple');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Update selected tier if event changes
  useEffect(() => {
    const initialTier = event.tiers.find(t => t.popular) || event.tiers[0];
    setSelectedTier(initialTier);
    setQuantity(1);
    setConfirmedBooking(null);
    window.scrollTo(0, 0);
  }, [slug, event]);

  const subtotal = selectedTier ? selectedTier.price * quantity : 0;
  const serviceFee = selectedTier.price > 0 ? 0 : 0; // Transparent zero fee
  const total = subtotal + serviceFee;

  const handleCheckout = (e) => {
    if (e) e.preventDefault();
    if (!fullName.trim()) {
      alert('Please enter the primary attendee name for the tickets.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address for digital ticket delivery.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const bookingRef = `55B-${event.slug.slice(0, 4).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedBooking({
        ref: bookingRef,
        attendee: fullName,
        email,
        tierName: selectedTier.name,
        quantity,
        total,
        currency: event.currency,
        eventName: event.title,
        venue: event.venue,
        date: event.fullDate,
        time: event.time,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }, 1200);
  };

  const otherEvents = events.filter(e => e.id !== event.id);

  return (
    <div className="paywall-page">
      {/* Ambient Blurred Backdrop */}
      <div className="paywall-backdrop" aria-hidden="true">
        <img src={event.img} alt="" className="paywall-backdrop__img" />
        <div className="paywall-backdrop__gradient" />
      </div>

      <div className="paywall-container">
        {/* Navigation Bar */}
        <div className="paywall-nav-bar">
          <Link to="/#events" className="paywall-back-link">
            ← Back to All Events
          </Link>
          <div className="paywall-status-pill">
            <span className="paywall-status-dot" />
            Official Box Office • Instant Mobile Pass
          </div>
        </div>

        {/* Hero Banner */}
        <section className="paywall-hero">
          <div className="paywall-thumb-wrap">
            <img src={event.img} alt={event.title} className="paywall-thumb-img" />
            <div className="paywall-thumb-badge">
              {event.startingPrice === 0 ? 'Complimentary RSVP' : `From ${event.currency}${event.startingPrice}`}
            </div>
          </div>

          <div className="paywall-hero-content">
            <div className="paywall-meta-tags">
              <span className="paywall-meta-date">{event.fullDate}</span>
              <span className="paywall-meta-dot">•</span>
              <span className="paywall-meta-venue">{event.venue}</span>
            </div>

            <h1 className="paywall-title">{event.title}</h1>
            <p className="paywall-tagline">{event.tagline}</p>

            <div className="paywall-quick-specs">
              <div className="paywall-spec-item">
                <span className="paywall-spec-label">Time</span>
                <span className="paywall-spec-val">{event.time}</span>
              </div>
              <div className="paywall-spec-item">
                <span className="paywall-spec-label">City</span>
                <span className="paywall-spec-val">{event.location}</span>
              </div>
              <div className="paywall-spec-item">
                <span className="paywall-spec-label">Format</span>
                <span className="paywall-spec-val">Live Performance & Salon</span>
              </div>
              <div className="paywall-spec-item">
                <span className="paywall-spec-label">Entry</span>
                <span className="paywall-spec-val">Digital Pass / Apple Wallet</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Grid: Details Left, Paywall Checkout Right */}
        <div className="paywall-grid">
          {/* Left Column: Event Narrative & Information */}
          <div className="paywall-details">
            {/* About / Description */}
            <div className="paywall-card-box">
              <div className="paywall-section-head">
                <h2 className="paywall-section-title">The Experience</h2>
              </div>
              <p className="paywall-body-text">{event.description}</p>
            </div>

            {/* Program & Lineup */}
            {event.lineup && event.lineup.length > 0 && (
              <div className="paywall-card-box">
                <div className="paywall-section-head">
                  <h2 className="paywall-section-title">Curated Lineup & Timeline</h2>
                </div>
                <div className="paywall-lineup-list">
                  {event.lineup.map((item, idx) => (
                    <div key={idx} className="paywall-lineup-item">
                      <div className="paywall-lineup-main">
                        <span className="paywall-lineup-artist">{item.artist}</span>
                        <span className="paywall-lineup-role">{item.role}</span>
                      </div>
                      <span className="paywall-lineup-time">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="paywall-card-box">
                <div className="paywall-section-head">
                  <h2 className="paywall-section-title">Included Amenities</h2>
                </div>
                <div className="paywall-highlights-grid">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="paywall-highlight-pill">
                      <span className="paywall-check-icon">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue & Door Policy */}
            <div className="paywall-card-box">
              <div className="paywall-section-head">
                <h2 className="paywall-section-title">Venue & Admission Guidelines</h2>
              </div>
              <div className="paywall-rules-list">
                <div className="paywall-rule-item">
                  <span className="paywall-rule-bullet" />
                  <span><strong>Venue Address:</strong> {event.address}</span>
                </div>
                {event.doorPolicy.map((policy, idx) => (
                  <div key={idx} className="paywall-rule-item">
                    <span className="paywall-rule-bullet" />
                    <span>{policy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Paywall & Checkout */}
          <aside className="paywall-checkout-panel">
            <div className="paywall-checkout-header">
              <h2 className="paywall-checkout-title">Select Admission Tier</h2>
              <p className="paywall-checkout-sub">Direct reservation • Instant ticket issuance</p>
            </div>

            {/* Tiers List */}
            <div className="paywall-tier-list">
              {event.tiers.map((tier) => {
                const isSelected = selectedTier?.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`paywall-tier-card${isSelected ? ' is-selected' : ''}`}
                    onClick={() => setSelectedTier(tier)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedTier(tier); }}
                  >
                    <div className="paywall-tier-top">
                      <div className="paywall-tier-radio-wrap">
                        <div className="paywall-radio-circle">
                          <div className="paywall-radio-inner" />
                        </div>
                        <div>
                          <span className="paywall-tier-name">{tier.name}</span>
                          {tier.badge && (
                            <span className="paywall-tier-badge">{tier.badge}</span>
                          )}
                        </div>
                      </div>
                      <span className="paywall-tier-price">
                        {tier.price === 0 ? 'Free' : `${event.currency}${tier.price}`}
                      </span>
                    </div>

                    <p className="paywall-tier-desc">{tier.description}</p>

                    <ul className="paywall-tier-features">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="paywall-tier-feature-item">{feat}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Quantity Selector */}
            <div className="paywall-qty-wrap">
              <span className="paywall-qty-label">Ticket Quantity</span>
              <div className="paywall-qty-controls">
                <button
                  type="button"
                  className="paywall-qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="paywall-qty-num">{quantity}</span>
                <button
                  type="button"
                  className="paywall-qty-btn"
                  onClick={() => setQuantity(Math.min(8, quantity + 1))}
                  disabled={quantity >= 8}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Guest Details Form */}
            <form onSubmit={handleCheckout} className="paywall-form-section">
              <input
                type="text"
                className="paywall-input-field"
                placeholder="Full Name (for ticket badge)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                className="paywall-input-field"
                placeholder="Email Address (for digital delivery)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                className="paywall-input-field"
                placeholder="Phone Number (SMS pass option)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              {/* Order Summary */}
              <div className="paywall-summary-box">
                <div className="paywall-summary-line">
                  <span>{selectedTier.name} × {quantity}</span>
                  <span>{selectedTier.price === 0 ? 'Free' : `${event.currency}${subtotal}`}</span>
                </div>
                <div className="paywall-summary-line">
                  <span>Box Office Fee</span>
                  <span>Included (€0.00)</span>
                </div>
                <div className="paywall-summary-total">
                  <span>Total Amount</span>
                  <span>{total === 0 ? 'Free RSVP' : `${event.currency}${total} ${event.currencyCode}`}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="paywall-actions">
                <button
                  type="submit"
                  className="paywall-btn-apple"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    'Securing tickets...'
                  ) : total === 0 ? (
                    'Confirm Free RSVP'
                  ) : (
                    <>
                      <span> Pay with Apple Pay</span>
                      <span>•</span>
                      <span>{event.currency}{total}</span>
                    </>
                  )}
                </button>

                {total > 0 && (
                  <button
                    type="submit"
                    className="paywall-btn-card"
                    disabled={isProcessing}
                  >
                    Pay with Credit or Debit Card
                  </button>
                )}
              </div>

              <div className="paywall-security-note">
                <span>🔒</span>
                <span>256-Bit SSL Encrypted • 100% Guaranteed Official Tickets</span>
              </div>
            </form>
          </aside>
        </div>

        {/* Explore Other Events */}
        {otherEvents.length > 0 && (
          <section className="paywall-more-events">
            <div className="paywall-more-head">
              <div>
                <h3 className="paywall-more-title">Other Upcoming Gatherings</h3>
                <p className="paywall-more-sub">Explore other dates across Europe and the Americas</p>
              </div>
            </div>
            <div className="paywall-more-grid">
              {otherEvents.map((oe) => (
                <Link key={oe.id} to={`/events/${oe.slug}`} className="paywall-more-card">
                  <div className="paywall-more-card-img-wrap">
                    <img src={oe.img} alt={oe.title} className="paywall-more-card-img" loading="lazy" />
                  </div>
                  <div className="paywall-more-card-body">
                    <span className="paywall-more-card-date">{oe.date}</span>
                    <h4 className="paywall-more-card-title">{oe.title}</h4>
                    <span className="paywall-more-card-cta">
                      {oe.startingPrice === 0 ? 'RSVP' : `Get tickets from ${oe.currency}${oe.startingPrice}`} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Digital Ticket Pass Modal */}
      {confirmedBooking && (
        <div className="paywall-modal-overlay" role="dialog" aria-modal="true">
          <div className="paywall-ticket-modal">
            <div className="paywall-ticket-head">
              <div className="paywall-ticket-status">
                <span>✓</span> Confirmed Reservation
              </div>
              <h3 className="paywall-ticket-event-name">{confirmedBooking.eventName}</h3>
              <p className="paywall-ticket-venue">{confirmedBooking.venue}</p>
            </div>

            <div className="paywall-ticket-body">
              <div className="paywall-ticket-details-grid">
                <div className="paywall-ticket-detail-item">
                  <span className="paywall-ticket-label">Primary Guest</span>
                  <span className="paywall-ticket-value">{confirmedBooking.attendee}</span>
                </div>
                <div className="paywall-ticket-detail-item">
                  <span className="paywall-ticket-label">Pass Tier</span>
                  <span className="paywall-ticket-value">{confirmedBooking.tierName}</span>
                </div>
                <div className="paywall-ticket-detail-item">
                  <span className="paywall-ticket-label">Date & Time</span>
                  <span className="paywall-ticket-value">{confirmedBooking.date} • {confirmedBooking.time}</span>
                </div>
                <div className="paywall-ticket-detail-item">
                  <span className="paywall-ticket-label">Pass Quantity</span>
                  <span className="paywall-ticket-value">{confirmedBooking.quantity} {confirmedBooking.quantity === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="paywall-ticket-detail-item full-width">
                  <span className="paywall-ticket-label">Booking Reference</span>
                  <span className="paywall-ticket-value" style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                    {confirmedBooking.ref}
                  </span>
                </div>
              </div>

              {/* Barcode & QR Code simulation */}
              <div className="paywall-ticket-qr-section">
                <svg className="paywall-barcode-svg" viewBox="0 0 200 45" fill="#000">
                  <rect x="0" y="0" width="3" height="40" />
                  <rect x="5" y="0" width="1" height="40" />
                  <rect x="8" y="0" width="4" height="40" />
                  <rect x="14" y="0" width="2" height="40" />
                  <rect x="18" y="0" width="1" height="40" />
                  <rect x="22" y="0" width="5" height="40" />
                  <rect x="29" y="0" width="2" height="40" />
                  <rect x="33" y="0" width="1" height="40" />
                  <rect x="36" y="0" width="3" height="40" />
                  <rect x="42" y="0" width="2" height="40" />
                  <rect x="46" y="0" width="4" height="40" />
                  <rect x="52" y="0" width="1" height="40" />
                  <rect x="55" y="0" width="3" height="40" />
                  <rect x="60" y="0" width="5" height="40" />
                  <rect x="68" y="0" width="2" height="40" />
                  <rect x="72" y="0" width="1" height="40" />
                  <rect x="75" y="0" width="4" height="40" />
                  <rect x="81" y="0" width="2" height="40" />
                  <rect x="85" y="0" width="3" height="40" />
                  <rect x="90" y="0" width="1" height="40" />
                  <rect x="94" y="0" width="5" height="40" />
                  <rect x="102" y="0" width="2" height="40" />
                  <rect x="106" y="0" width="4" height="40" />
                  <rect x="112" y="0" width="1" height="40" />
                  <rect x="115" y="0" width="3" height="40" />
                  <rect x="120" y="0" width="2" height="40" />
                  <rect x="124" y="0" width="5" height="40" />
                  <rect x="131" y="0" width="2" height="40" />
                  <rect x="135" y="0" width="1" height="40" />
                  <rect x="138" y="0" width="4" height="40" />
                  <rect x="144" y="0" width="2" height="40" />
                  <rect x="148" y="0" width="3" height="40" />
                  <rect x="153" y="0" width="1" height="40" />
                  <rect x="156" y="0" width="5" height="40" />
                  <rect x="163" y="0" width="2" height="40" />
                  <rect x="167" y="0" width="4" height="40" />
                  <rect x="173" y="0" width="1" height="40" />
                  <rect x="176" y="0" width="3" height="40" />
                  <rect x="181" y="0" width="5" height="40" />
                  <rect x="188" y="0" width="2" height="40" />
                  <rect x="192" y="0" width="3" height="40" />
                  <rect x="197" y="0" width="3" height="40" />
                </svg>
                <span className="paywall-barcode-code">{confirmedBooking.ref}</span>
              </div>

              <div className="paywall-ticket-actions">
                <button
                  type="button"
                  className="paywall-btn-download"
                  onClick={() => alert(`Your digital ticket pass has been dispatched to ${confirmedBooking.email}. It is also available in your Apple Wallet.`)}
                >
                   Add to Apple Wallet
                </button>
                <button
                  type="button"
                  className="paywall-btn-download"
                  onClick={() => window.print()}
                >
                  ↓ Download PDF Ticket
                </button>
                <button
                  type="button"
                  className="paywall-btn-close"
                  onClick={() => setConfirmedBooking(null)}
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
