import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApi } from "../hooks/useApi";

function BookingCard({ booking, onStatusChange }) {
  const statusMap = {
    pending: { label: "In attesa", color: "warning", icon: "bi-clock" },
    confirmed: {
      label: "Confermata",
      color: "success",
      icon: "bi-check-circle",
    },
    cancelled: { label: "Cancellata", color: "danger", icon: "bi-x-circle" },
    checkedin: { label: "Check-in", color: "info", icon: "bi-door-open" },
    checkedout: {
      label: "Check-out",
      color: "secondary",
      icon: "bi-door-closed",
    },
  };
  const s = statusMap[booking.status] || statusMap.pending;
  const nights = Math.ceil(
    (new Date(booking.checkOut) - new Date(booking.checkIn)) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="dashboard-card booking-card-dash">
      <div className="booking-card-header">
        <div>
          <h5>{booking.guestName}</h5>
          <span className="text-muted small">{booking.guestEmail}</span>
        </div>
        <span className={`status-badge status-${s.color}`}>
          <i className={`bi ${s.icon} me-1`}></i>
          {s.label}
        </span>
      </div>
      <div className="booking-card-body">
        <div className="booking-info-row">
          <span>
            <i className="bi bi-house me-1"></i>
            {booking.roomName || "Stanza"}
          </span>
          <span>
            <i className="bi bi-people me-1"></i>
            {booking.guestsCount} ospiti
          </span>
        </div>
        <div className="booking-info-row">
          <span>
            <i className="bi bi-calendar-event me-1"></i>
            {new Date(booking.checkIn).toLocaleDateString("it-IT")} →{" "}
            {new Date(booking.checkOut).toLocaleDateString("it-IT")}
          </span>
          <span>
            <i className="bi bi-moon-stars me-1"></i>
            {nights} notti
          </span>
        </div>
        {booking.notes && (
          <div className="booking-notes">
            <i className="bi bi-chat-left-text me-1"></i>
            {booking.notes}
          </div>
        )}
      </div>
      <div className="booking-card-actions">
        {booking.status === "pending" && (
          <>
            <button
              className="btn-action btn-confirm-sm"
              onClick={() => onStatusChange(booking.id, "confirmed")}
            >
              <i className="bi bi-check-circle me-1"></i>Conferma
            </button>
            <button
              className="btn-action btn-cancel-sm"
              onClick={() => onStatusChange(booking.id, "cancelled")}
            >
              <i className="bi bi-x-circle me-1"></i>Rifiuta
            </button>
          </>
        )}
        {booking.status === "confirmed" && (
          <button
            className="btn-action btn-checkin-sm"
            onClick={() => onStatusChange(booking.id, "checkedin")}
          >
            <i className="bi bi-door-open me-1"></i>Check-in
          </button>
        )}
        {booking.status === "checkedin" && (
          <button
            className="btn-action btn-checkout-sm"
            onClick={() => onStatusChange(booking.id, "checkedout")}
          >
            <i className="bi bi-door-closed me-1"></i>Check-out
          </button>
        )}
      </div>
    </div>
  );
}

function BookingsList() {
  const { authFetch } = useApi();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    authFetch("/api/Bookings/")
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await authFetch(`/api/Bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    checkedin: bookings.filter((b) => b.status === "checkedin").length,
  };

  return (
    <div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <i className="bi bi-clock stat-icon text-warning"></i>
          <div>
            <strong>{counts.pending}</strong>
            <span>In attesa</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="bi bi-check-circle stat-icon text-success"></i>
          <div>
            <strong>{counts.confirmed}</strong>
            <span>Confermate</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="bi bi-door-open stat-icon text-info"></i>
          <div>
            <strong>{counts.checkedin}</strong>
            <span>Presenti</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="bi bi-calendar-range stat-icon text-primary"></i>
          <div>
            <strong>{bookings.length}</strong>
            <span>Totali</span>
          </div>
        </div>
      </div>
      <div className="filter-tabs">
        {[
          "all",
          "pending",
          "confirmed",
          "checkedin",
          "checkedout",
          "cancelled",
        ].map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? "Tutte"
              : f === "pending"
                ? "In attesa"
                : f === "confirmed"
                  ? "Confermate"
                  : f === "checkedin"
                    ? "Presenti"
                    : f === "checkedout"
                      ? "Partiti"
                      : "Cancellate"}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-calendar-x"></i>
          <p>Nessuna prenotazione in questa categoria</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {filtered.map((b) => (
            <BookingCard key={b.id} booking={b} onStatusChange={handleStatus} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsList() {
  const { authFetch } = useApi();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/Reviews/")
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div>
      <div className="reviews-header-dash">
        <div className="avg-rating-card">
          <span className="avg-rating-number">{avgRating}</span>
          <div>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <i
                  key={s}
                  className={`bi ${parseFloat(avgRating) >= s ? "bi-star-fill" : "bi-star"} text-warning`}
                ></i>
              ))}
            </div>
            <span className="text-muted small">
              {reviews.length} recensioni
            </span>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-star"></i>
          <p>Nessuna recensione ancora</p>
        </div>
      ) : (
        <div className="reviews-grid-dash">
          {reviews.map((r) => (
            <div key={r.id} className="review-card-dash">
              <div className="review-top">
                <div>
                  <strong>{r.guestName}</strong>
                  <span className="text-muted small ms-2">
                    {new Date(r.createdAt).toLocaleDateString("it-IT")}
                  </span>
                </div>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i
                      key={s}
                      className={`bi ${r.rating >= s ? "bi-star-fill" : "bi-star"} text-warning`}
                    ></i>
                  ))}
                </div>
              </div>
              <p className="review-text-dash">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <img
            src="/Le_Mura_degli_Angeli__1_-removebg-preview.png"
            alt="logo"
          />
          <p className="sidebar-subtitle">Gestionale</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/dashboard/prenotazioni"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-calendar-range"></i>
            <span>Prenotazioni</span>
          </NavLink>
          <NavLink
            to="/dashboard/recensioni"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-star"></i>
            <span>Recensioni</span>
          </NavLink>
          <a href="/" className="sidebar-link">
            <i className="bi bi-house"></i>
            <span>Sito pubblico</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <i className="bi bi-person-circle me-2"></i>
            <span>{user?.name || user?.email}</span>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Esci
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <Routes>
          <Route
            index
            element={
              <div>
                <h2 className="dashboard-title">
                  Benvenuto, {user?.name || "Proprietario"} 👋
                </h2>
                <p className="text-muted">
                  Gestisci prenotazioni e recensioni del tuo B&B
                </p>
                <BookingsList />
              </div>
            }
          />
          <Route
            path="prenotazioni"
            element={
              <div>
                <h2 className="dashboard-title">Prenotazioni</h2>
                <BookingsList />
              </div>
            }
          />
          <Route
            path="recensioni"
            element={
              <div>
                <h2 className="dashboard-title">Recensioni</h2>
                <ReviewsList />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
