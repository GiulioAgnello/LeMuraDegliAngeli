import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";

const MONTHS = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];
const DAYS = ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"];

function Calendar({ bookedDates, onRangeSelect, selectedRange }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;

  const isBooked = (d) =>
    bookedDates.some((r) => new Date(r.from) <= d && d <= new Date(r.to));
  const isPast = (d) => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };
  const isInRange = (d) => {
    if (!selectedRange.from) return false;
    if (selectedRange.to)
      return d >= selectedRange.from && d <= selectedRange.to;
    return false;
  };
  const isStart = (d) =>
    selectedRange.from?.toDateString() === d.toDateString();
  const isEnd = (d) => selectedRange.to?.toDateString() === d.toDateString();

  const handleDayClick = (d) => {
    if (isPast(d) || isBooked(d)) return;
    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      onRangeSelect({ from: d, to: null });
    } else {
      if (d <= selectedRange.from) onRangeSelect({ from: d, to: null });
      else onRangeSelect({ from: selectedRange.from, to: d });
    }
  };

  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++)
    days.push(new Date(year, month, i));

  return (
    <div className="calendar-widget">
      <div className="calendar-header">
        <button
          className="cal-nav"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          disabled={year === today.getFullYear() && month === today.getMonth()}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <span className="cal-title">
          {MONTHS[month]} {year}
        </span>
        <button
          className="cal-nav"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="calendar-grid">
        {DAYS.map((d) => (
          <div key={d} className="cal-day-name">
            {d}
          </div>
        ))}
        {days.map((d, i) => (
          <div
            key={i}
            className={[
              "cal-day",
              !d ? "empty" : "",
              d && isPast(d) ? "past" : "",
              d && isBooked(d) ? "booked" : "",
              d && isStart(d) ? "range-start" : "",
              d && isEnd(d) ? "range-end" : "",
              d && isInRange(d) ? "in-range" : "",
              d && !isPast(d) && !isBooked(d) ? "available" : "",
            ].join(" ")}
            onClick={() => d && handleDayClick(d)}
          >
            {d ? d.getDate() : ""}
          </div>
        ))}
      </div>
      <div className="cal-legend">
        <span>
          <span className="legend-dot available"></span>Disponibile
        </span>
        <span>
          <span className="legend-dot booked"></span>Occupato
        </span>
        <span>
          <span className="legend-dot range-start"></span>Selezionato
        </span>
      </div>
    </div>
  );
}

export default function Booking() {
  const { authFetch } = useApi();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [range, setRange] = useState({ from: null, to: null });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    notes: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    authFetch("/api/Rooms/").then(setRooms).catch(console.error);
  }, []);
  useEffect(() => {
    if (!selectedRoom) return;
    authFetch(`/api/Bookings/room/${selectedRoom.id}/booked-dates`)
      .then(setBookedDates)
      .catch(() => setBookedDates([]));
  }, [selectedRoom]);

  const nights =
    range.from && range.to
      ? Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24))
      : 0;
  const totalPrice =
    selectedRoom && nights
      ? (selectedRoom.pricePerNight * nights).toFixed(2)
      : 0;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authFetch("/api/Bookings/", {
        method: "POST",
        body: JSON.stringify({
          roomId: selectedRoom.id,
          checkIn: range.from.toISOString(),
          checkOut: range.to.toISOString(),
          guestName: form.name,
          guestEmail: form.email,
          guestPhone: form.phone,
          guestsCount: form.guests,
          notes: form.notes,
        }),
      });
      setSuccess(true);
    } catch (err) {
      alert("Errore: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="booking-page">
        <div className="booking-success">
          <div className="success-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <h2>Richiesta inviata!</h2>
          <p>
            Riceverai una conferma via email a <strong>{form.email}</strong>.
            <br />
            Ti contatteremo entro 24 ore.
          </p>
          <a href="/" className="btn-primary-custom">
            Torna alla Home
          </a>
        </div>
      </div>
    );

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <h1>Prenota il tuo soggiorno</h1>
        <p>Nel cuore del Salento, tra storia e natura</p>
      </div>
      <div className="booking-container">
        <div className="booking-steps">
          {[
            "Scegli la stanza",
            "Seleziona le date",
            "I tuoi dati",
            "Conferma",
          ].map((s, i) => (
            <div
              key={i}
              className={`booking-step ${step > i + 1 ? "done" : ""} ${step === i + 1 ? "active" : ""}`}
            >
              <div className="step-circle">
                {step > i + 1 ? <i className="bi bi-check"></i> : i + 1}
              </div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="booking-step-content">
            <h3>Quale struttura preferisci?</h3>
            <div className="room-cards">
              {rooms.length === 0 && (
                <p className="text-muted text-center py-5">
                  Caricamento stanze...
                </p>
              )}
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`room-card ${selectedRoom?.id === room.id ? "selected" : ""}`}
                  onClick={() => setSelectedRoom(room)}
                >
                  {room.imageUrl && (
                    <img
                      src={room.imageUrl}
                      alt={room.name}
                      className="room-card-img"
                    />
                  )}
                  <div className="room-card-body">
                    <h4>{room.name}</h4>
                    <p>{room.description}</p>
                    <div className="room-meta">
                      <span>
                        <i className="bi bi-rulers me-1"></i>
                        {room.pricePerNight} m²
                      </span>
                      <span>
                        <i className="bi bi-people me-1"></i>max{" "}
                        {room.maxGuests || 4} ospiti
                      </span>
                    </div>
                  </div>
                  {selectedRoom?.id === room.id && (
                    <div className="room-selected-badge">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              className="btn-next"
              disabled={!selectedRoom}
              onClick={() => setStep(2)}
            >
              Continua <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step-content">
            <h3>Seleziona le date</h3>
            <p className="text-muted">Clicca su arrivo e poi su partenza</p>
            <div className="calendar-wrapper">
              <Calendar
                bookedDates={bookedDates}
                onRangeSelect={setRange}
                selectedRange={range}
              />
              {range.from && range.to && (
                <div className="booking-summary-mini">
                  <div className="summary-row">
                    <span>
                      <i className="bi bi-calendar-event me-2"></i>Arrivo:
                    </span>
                    <strong>{range.from.toLocaleDateString("it-IT")}</strong>
                  </div>
                  <div className="summary-row">
                    <span>
                      <i className="bi bi-calendar-x me-2"></i>Partenza:
                    </span>
                    <strong>{range.to.toLocaleDateString("it-IT")}</strong>
                  </div>
                  <div className="summary-row">
                    <span>
                      <i className="bi bi-moon-stars me-2"></i>Notti:
                    </span>
                    <strong>{nights}</strong>
                  </div>
                </div>
              )}
            </div>
            <div className="step-nav">
              <button className="btn-back" onClick={() => setStep(1)}>
                <i className="bi bi-arrow-left me-2"></i>Indietro
              </button>
              <button
                className="btn-next"
                disabled={!range.from || !range.to}
                onClick={() => setStep(3)}
              >
                Continua <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step-content">
            <h3>I tuoi dati</h3>
            <div className="booking-form">
              <div className="row g-3">
                <div className="col-md-6">
                  <label>Nome e cognome *</label>
                  <input
                    type="text"
                    className="form-control booking-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Mario Rossi"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Email *</label>
                  <input
                    type="email"
                    className="form-control booking-input"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="mario@email.com"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Telefono</label>
                  <input
                    type="tel"
                    className="form-control booking-input"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+39 333 1234567"
                  />
                </div>
                <div className="col-md-6">
                  <label>Numero ospiti *</label>
                  <select
                    className="form-control booking-input"
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: parseInt(e.target.value) })
                    }
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "persona" : "persone"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label>Note o richieste speciali</label>
                  <textarea
                    className="form-control booking-input"
                    rows={3}
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    placeholder="Allergie, preferenze, orari di arrivo..."
                  />
                </div>
              </div>
            </div>
            <div className="step-nav">
              <button className="btn-back" onClick={() => setStep(2)}>
                <i className="bi bi-arrow-left me-2"></i>Indietro
              </button>
              <button
                className="btn-next"
                disabled={!form.name || !form.email}
                onClick={() => setStep(4)}
              >
                Riepilogo <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="booking-step-content">
            <h3>Riepilogo prenotazione</h3>
            <div className="booking-recap">
              <div className="recap-section">
                <h5>
                  <i className="bi bi-house me-2"></i>Struttura
                </h5>
                <p>{selectedRoom?.name}</p>
              </div>
              <div className="recap-section">
                <h5>
                  <i className="bi bi-calendar2-range me-2"></i>Date
                </h5>
                <p>
                  {range.from?.toLocaleDateString("it-IT")} →{" "}
                  {range.to?.toLocaleDateString("it-IT")} ({nights} notti)
                </p>
              </div>
              <div className="recap-section">
                <h5>
                  <i className="bi bi-person me-2"></i>Ospite
                </h5>
                <p>
                  {form.name} · {form.email} · {form.guests}{" "}
                  {form.guests === 1 ? "persona" : "persone"}
                </p>
              </div>
              {form.notes && (
                <div className="recap-section">
                  <h5>
                    <i className="bi bi-chat-left-text me-2"></i>Note
                  </h5>
                  <p>{form.notes}</p>
                </div>
              )}
              <div className="recap-total">
                <span>Totale stimato</span>
                <span className="price-total">€{totalPrice}</span>
              </div>
              <p className="recap-disclaimer">
                <i className="bi bi-info-circle me-1"></i>La prenotazione verrà
                confermata dal proprietario entro 24 ore
              </p>
            </div>
            <div className="step-nav">
              <button className="btn-back" onClick={() => setStep(3)}>
                <i className="bi bi-arrow-left me-2"></i>Modifica
              </button>
              <button
                className="btn-confirm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Invio...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-check me-2"></i>Invia Prenotazione
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
