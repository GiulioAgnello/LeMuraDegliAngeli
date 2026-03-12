import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating-input">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className={`star-btn ${s <= (hover || value) ? "active" : ""}`}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
        >
          <i className="bi bi-star-fill"></i>
        </button>
      ))}
    </div>
  );
}

export default function GuestPortal() {
  const { user, logout } = useAuth();
  const { authFetch } = useApi();
  const [booking, setBooking] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [review, setReview] = useState({ rating: 0, comment: "" });
  const [reviewSent, setReviewSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.bookingId) {
      setLoading(false);
      return;
    }
    authFetch(`/api/Bookings/${user.bookingId}`)
      .then(setBooking)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!review.rating) return alert("Seleziona una valutazione");
    try {
      await authFetch("/api/Reviews/", {
        method: "POST",
        body: JSON.stringify({
          bookingId: user.bookingId,
          rating: review.rating,
          comment: review.comment,
          guestName: user.name,
        }),
      });
      setReviewSent(true);
    } catch (e) {
      alert("Errore: " + e.message);
    }
  };

  const checkoutDate = booking ? new Date(booking.checkOut) : null;
  const today = new Date();
  const daysLeft = checkoutDate
    ? Math.ceil((checkoutDate - today) / (1000 * 60 * 60 * 24))
    : null;

  const localTips = [
    {
      icon: "bi-geo-alt",
      title: "Piazza Castello",
      desc: "Il centro storico di Sternatia — a 2 min a piedi",
      tag: "2 min",
    },
    {
      icon: "bi-water",
      title: "Porto Cesareo",
      desc: "Acque cristalline, la spiaggia più bella del Salento",
      tag: "30 min",
    },
    {
      icon: "bi-cup-hot",
      title: "Bar Renna",
      desc: "Il caffè e i pasticciotti migliori del borgo",
      tag: "3 min",
    },
    {
      icon: "bi-building",
      title: "Otranto",
      desc: "Cattedrale, castello e mare incantevole",
      tag: "25 min",
    },
    {
      icon: "bi-tree",
      title: "Bosco delle Tre Foglie",
      desc: "Escursioni nella natura salentina",
      tag: "15 min",
    },
    {
      icon: "bi-fork-knife",
      title: "La Taverna del Borgo",
      desc: "Cucina tipica salentina, prenotare al +39 333 xxx",
      tag: "5 min",
    },
  ];

  if (loading)
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="guest-portal">
      <div className="guest-header">
        <div className="guest-welcome">
          <i className="bi bi-house-heart guest-icon"></i>
          <div>
            <h2>Benvenuto, {user?.name}!</h2>
            {daysLeft !== null && daysLeft > 0 && (
              <p>
                Ancora <strong>{daysLeft}</strong>{" "}
                {daysLeft === 1 ? "notte" : "notti"} di soggiorno
              </p>
            )}
            {daysLeft === 0 && (
              <p>
                Oggi è il tuo giorno di partenza — è stato un piacere ospitarti!
              </p>
            )}
          </div>
        </div>
        <button
          className="btn-logout-guest"
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
        >
          <i className="bi bi-box-arrow-right me-1"></i>Esci
        </button>
      </div>

      <div className="guest-tabs">
        {[
          { key: "info", icon: "bi-wifi", label: "Info Struttura" },
          { key: "tips", icon: "bi-map", label: "Consigli Locali" },
          { key: "review", icon: "bi-star", label: "Lascia Recensione" },
        ].map((t) => (
          <button
            key={t.key}
            className={`guest-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            <i className={`bi ${t.icon} me-2`}></i>
            {t.label}
          </button>
        ))}
      </div>

      <div className="guest-content">
        {activeTab === "info" && (
          <div className="guest-info-grid">
            <div className="info-card wifi-card">
              <div className="info-card-icon">
                <i className="bi bi-wifi"></i>
              </div>
              <h4>WiFi</h4>
              <div className="wifi-details">
                <div className="wifi-row">
                  <span>Rete:</span>
                  <strong>LeMuraAngeli_5G</strong>
                </div>
                <div className="wifi-row">
                  <span>Password:</span>
                  <strong className="wifi-password">Salento2024!</strong>
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <i className="bi bi-clock"></i>
              </div>
              <h4>Orari</h4>
              <ul className="info-list">
                <li>
                  <i className="bi bi-door-open me-2 text-success"></i>Check-in:
                  15:00 — 20:00
                </li>
                <li>
                  <i className="bi bi-door-closed me-2 text-danger"></i>
                  Check-out: entro le 11:00
                </li>
                <li>
                  <i className="bi bi-cup-hot me-2 text-warning"></i>Colazione:
                  8:00 — 10:00
                </li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <i className="bi bi-telephone"></i>
              </div>
              <h4>Contatti</h4>
              <ul className="info-list">
                <li>
                  <i className="bi bi-whatsapp me-2 text-success"></i>WhatsApp:
                  +39 327 120 8496
                </li>
                <li>
                  <i className="bi bi-telephone me-2 text-primary"></i>Telefono:
                  +39 327 120 8496
                </li>
                <li>
                  <i className="bi bi-envelope me-2 text-primary"></i>
                  lemuradegliangeli@yahoo.com
                </li>
                <li>
                  <i className="bi bi-geo-alt me-2 text-danger"></i>Via Giudeca
                  28, Sternatia (LE)
                </li>
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <i className="bi bi-list-check"></i>
              </div>
              <h4>Regole della casa</h4>
              <ul className="info-list">
                <li>
                  <i className="bi bi-moon me-2"></i>Silenzio dopo le 00:00
                </li>
                <li>
                  <i className="bi bi-slash-circle me-2 text-danger"></i>Vietato
                  fumare in casa
                </li>
                <li>
                  <i className="bi bi-droplet me-2 text-primary"></i>Vietato
                  fare feste
                </li>
                <li>
                  <i className="bi bi-recycle me-2 text-success"></i>Raccolta
                  differenziata
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div className="tips-grid">
            <p className="tips-intro">
              <i className="bi bi-compass me-2"></i>I nostri consigli personali
              per scoprire il Salento autentico
            </p>
            {localTips.map((tip, i) => (
              <div key={i} className="tip-card">
                <div className="tip-icon">
                  <i className={`bi ${tip.icon}`}></i>
                </div>
                <div className="tip-body">
                  <div className="tip-header">
                    <h5>{tip.title}</h5>
                    <span className="tip-tag">
                      <i className="bi bi-car-front me-1"></i>
                      {tip.tag}
                    </span>
                  </div>
                  <p>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "review" && (
          <div className="review-section">
            {reviewSent ? (
              <div className="review-success">
                <i className="bi bi-star-fill review-success-icon"></i>
                <h3>Grazie mille!</h3>
                <p>
                  La tua recensione è stata inviata. Ci fa molto piacere! 🌟
                </p>
              </div>
            ) : (
              <>
                <p className="review-intro">
                  La tua opinione ci aiuta a migliorare e a far conoscere il B&B
                  ad altri viaggiatori.
                </p>
                <form onSubmit={submitReview} className="review-form">
                  <div className="form-group-review">
                    <label>La tua valutazione *</label>
                    <StarRating
                      value={review.rating}
                      onChange={(r) => setReview({ ...review, rating: r })}
                    />
                  </div>
                  <div className="form-group-review">
                    <label>Racconta la tua esperienza</label>
                    <textarea
                      className="form-control review-textarea"
                      rows={5}
                      value={review.comment}
                      onChange={(e) =>
                        setReview({ ...review, comment: e.target.value })
                      }
                      placeholder="Com'è stata la tua esperienza? La struttura, l'accoglienza, i dintorni..."
                    />
                  </div>
                  <button type="submit" className="btn-submit-review">
                    <i className="bi bi-send me-2"></i>Invia la tua recensione
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
