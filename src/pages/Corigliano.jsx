import { Link } from "react-router-dom";

export default function Corigliano() {
  const features = [
    { icon: "bi-rulers", text: "55 m² curati nei dettagli" },
    { icon: "bi-people", text: "Fino a 3 ospiti" },
    { icon: "bi-wifi", text: "WiFi ultra-veloce" },
    { icon: "bi-thermometer-half", text: "Climatizzazione" },
    { icon: "bi-cup-hot", text: "Colazione inclusa" },
    { icon: "bi-car-front", text: "Parcheggio privato" },
    { icon: "bi-building", text: "Vista sul castello" },
    { icon: "bi-tv", text: "Smart TV" },
  ];

  return (
    <div className="property-page">
      <div
        className="property-hero"
        style={{ backgroundImage: "url(/11.jpg)" }}
      >
        <div className="property-hero-overlay"></div>
        <div className="property-hero-content">
          <span className="property-location">
            <i className="bi bi-geo-alt me-2"></i>Corigliano d'Otranto, Lecce
          </span>
          <h1>Le Mura degli Angeli</h1>
          <p>
            Tra il castello angioino e i sapori autentici della Grecìa Salentina
          </p>
        </div>
      </div>

      <div className="container property-content">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="property-description">
              <h2>Nel cuore della Grecìa Salentina</h2>
              <p>
                Corigliano d'Otranto è uno dei borghi più affascinanti del
                Salento, parte della Grecìa Salentina — un territorio dove si
                parla ancora il griko, antica lingua di origine greca. La
                struttura si trova a pochi passi dal castello angioino aragonese
                e dal caratteristico centro storico.
              </p>
              <p>
                Un luogo ideale per chi vuole vivere il Salento autentico,
                lontano dalle spiagge affollate, immerso nella cultura, nella
                gastronomia e nelle tradizioni locali. La posizione centrale
                permette di raggiungere facilmente sia le spiagge adriatiche che
                quelle ioniche.
              </p>
            </div>
            <div className="property-features">
              <h3>Caratteristiche</h3>
              <div className="features-grid">
                {features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <i className={`bi ${f.icon}`}></i>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="property-surroundings">
              <h3>Dintorni</h3>
              <ul className="surroundings-list">
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Otranto —
                  20 min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Castro — 25
                  min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Lecce — 25
                  min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Porto
                  Badisco — 30 min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Santa
                  Cesarea Terme — 20 min
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="booking-widget-sticky">
              <div className="booking-widget">
                <h4>Disponibilità</h4>
                <p className="text-muted">
                  Controlla le date disponibili e prenota direttamente online
                </p>
                <Link to="/prenota" className="btn-book-now w-100">
                  <i className="bi bi-calendar-check me-2"></i>Verifica
                  disponibilità
                </Link>
                <div className="widget-divider">
                  <span>oppure</span>
                </div>
                <a
                  href="https://wa.me/393331234567"
                  className="btn-whatsapp w-100"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-whatsapp me-2"></i>Contattaci su WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
