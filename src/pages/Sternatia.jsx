import { Link } from "react-router-dom";

export default function Sternatia() {
  const features = [
    { icon: "bi-rulers", text: "60 m² di spazio autentico" },
    { icon: "bi-people", text: "Fino a 4 ospiti" },
    { icon: "bi-wifi", text: "WiFi ultra-veloce" },
    { icon: "bi-thermometer-half", text: "Climatizzazione" },
    { icon: "bi-cup-hot", text: "Colazione inclusa" },
    { icon: "bi-car-front", text: "Parcheggio privato" },
    { icon: "bi-flower1", text: "Terrazzo panoramico" },
    { icon: "bi-tv", text: 'Smart TV 50"' },
  ];

  return (
    <div className="property-page">
      <div className="property-hero" style={{ backgroundImage: "url(/2.jpg)" }}>
        <div className="property-hero-overlay"></div>
        <div className="property-hero-content">
          <span className="property-location">
            <i className="bi bi-geo-alt me-2"></i>Sternatia, Lecce
          </span>
          <h1>Le Mura degli Angeli</h1>
          <p>Un palazzo del '600 nel cuore del borgo medievale</p>
        </div>
      </div>

      <div className="container property-content">
        <div className="row g-5">
          <div className="col-lg-7">
            <div className="property-description">
              <h2>Il luogo dove il tempo si ferma</h2>
              <p>
                Situata nel centro storico di Sternatia, questa struttura unica
                occupa un antico palazzo del XVII secolo completamente
                restaurato nel rispetto dell'architettura originale. Le mura in
                pietra leccese, i soffitti a volta e i pavimenti in cotto
                originale raccontano secoli di storia.
              </p>
              <p>
                A pochi passi dalla piazza del castello e dalla chiesa madre, la
                struttura offre un'esperienza autentica di vita nel borgo,
                lontano dal turismo di massa ma vicino a tutto ciò che il
                Salento ha da offrire.
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
                  <i className="bi bi-geo-alt text-primary me-2"></i>Porto
                  Cesareo — 35 min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Otranto —
                  25 min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Gallipoli —
                  40 min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Lecce — 20
                  min
                </li>
                <li>
                  <i className="bi bi-geo-alt text-primary me-2"></i>Santa Maria
                  di Leuca — 50 min
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
