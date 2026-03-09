import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <img
              src="/Le_Mura_degli_Angeli__1_-removebg-preview.png"
              alt="Le Mura degli Angeli"
              style={{
                height: 80,
                filter: "brightness(0) invert(1)",
                marginBottom: 16,
              }}
            />
            <p>
              Un B&B autentico nel cuore del Salento, tra storia, natura e
              ospitalità genuina.
            </p>

            <a
              href="https://wa.me/393331234567"
              className="btn-whatsapp d-inline-flex"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-whatsapp me-2"></i>WhatsApp
            </a>
          </div>

          <div className="col-6 col-md-2">
            <h5>Navigazione</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                ["/", "Home"],
                ["/sternatia", "Sternatia"],
                ["/corigliano", "Corigliano"],
                ["/gallery", "Gallery"],
                ["/storia", "La nostra storia"],
                ["/contatti", "Contatti"],
              ].map(([to, label]) => (
                <li key={to} style={{ marginBottom: 8 }}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h5>Area Riservata</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: 8 }}>
                <Link to="/prenota">Prenota</Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link to="/login">Accedi</Link>
              </li>
              <li style={{ marginBottom: 8 }}>
                <Link to="/dashboard">Gestionale</Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h5>Contatti</h5>
            <p style={{ marginBottom: 8 }}>
              <i
                className="bi bi-geo-alt me-2"
                style={{ color: "#c9a84c" }}
              ></i>
              Via degli Angeli 1, Sternatia (LE)
            </p>
            <p style={{ marginBottom: 8 }}>
              <i
                className="bi bi-envelope me-2"
                style={{ color: "#c9a84c" }}
              ></i>
              info@lemuradegliangeli.it
            </p>
            <p style={{ marginBottom: 8 }}>
              <i
                className="bi bi-telephone me-2"
                style={{ color: "#c9a84c" }}
              ></i>
              +39 333 xxx xxxx
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Le Mura degli Angeli — Tutti i diritti
            riservati
            <span style={{ margin: "0 12px" }}>·</span>
            P. IVA: 04XXXXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}
