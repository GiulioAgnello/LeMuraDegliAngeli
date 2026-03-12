import { useState } from "react";
import { useApi } from "../hooks/useApi";

export default function Contacts() {
  const { authFetch } = useApi();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authFetch("/api/Contact/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contacts-page">
      <div className="contacts-hero">
        <h1>Contattaci</h1>
        <p>Siamo qui per risponderti — sempre con il sorriso</p>
      </div>

      <div className="container contacts-content">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="contact-info">
              <h3>Come raggiungerci</h3>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="bi bi-whatsapp"></i>
                </div>
                <div>
                  <strong>WhatsApp</strong>
                  <a
                    href="https://wa.me/393271208496"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link"
                  >
                    +39 327 120 8496
                  </a>
                  <span className="text-muted small d-block">
                    Risposta entro poche ore
                  </span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <div>
                  <strong>Email</strong>
                  <a
                    href="mailto:lemuradegliangeli@yahoo.com"
                    className="contact-link"
                  >
                    lemuradegliangeli@yahoo.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <strong>Sternatia</strong>
                  <span>Via Giudeca 28, 73010 Sternatia (LE)</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="bi bi-building"></i>
                </div>
                <div>
                  <strong>Corigliano d'Otranto</strong>
                  <span>
                    Piazza del Castello 5, 73022 Corigliano d'Otranto (LE)
                  </span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <div>
                  <strong>Orari ricevimento</strong>
                  <span>Check-in: 15:00 – 20:00</span>
                  <span className="d-block">Check-out: entro le 11:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            {sent ? (
              <div className="contact-success">
                <i className="bi bi-check-circle-fill contact-success-icon"></i>
                <h3>Messaggio inviato!</h3>
                <p>Risponderemo entro 24 ore. Per urgenze usa WhatsApp.</p>
                <a
                  href="https://wa.me/393331234567"
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-whatsapp me-2"></i>Scrivi su WhatsApp
                </a>
              </div>
            ) : (
              <div className="contact-form-card">
                <h3>Mandaci un messaggio</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Nome *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label>Telefono</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-12">
                      <label>Messaggio *</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Hai domande sulla struttura, disponibilità, servizi?"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn-send-contact w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Invio...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>Invia messaggio
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="contacts-map mt-5">
          <iframe
            title="Sternatia"
            src="https://maps.google.com/maps?q=Sternatia,+Lecce&output=embed"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
