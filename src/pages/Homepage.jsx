import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((s) => (
          <i
            key={s}
            className={`bi ${review.rating >= s ? "bi-star-fill" : "bi-star"} text-warning`}
          ></i>
        ))}
      </div>
      <p className="review-comment">"{review.comment}"</p>
      <div className="review-author">
        <div className="review-avatar">
          {review.guestName?.charAt(0)?.toUpperCase()}
        </div>
        <div>
          <strong>{review.guestName}</strong>
          <span className="review-date">
            {new Date(review.createdAt).toLocaleDateString("it-IT", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Homepage() {
  const navigate = useNavigate();
  const { authFetch } = useApi();
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    authFetch("/api/Rooms/")
      .then(setRooms)
      .catch(() => setRooms([]));
    authFetch("/api/Reviews/public")
      .then(setReviews)
      .catch(() => setReviews([]));
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <>
      <section className="hero-section d-flex align-items-center justify-content-center">
        <div className="hero-overlay"></div>
        <div className="hero-content text-center text-white">
          <div className="typewriter-container">
            <div className="typewriter-text">
              Tranquillità, Comfort e Vitalenta...
            </div>
          </div>
          {avgRating && (
            <div className="hero-rating mt-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <i key={s} className="bi bi-star-fill text-warning me-1"></i>
              ))}
              <span className="ms-2">
                {avgRating} · {reviews.length} recensioni
              </span>
            </div>
          )}
          <div className="hero-cta mt-4">
            <Link to="/prenota" className="btn-hero-primary">
              <i className="bi bi-calendar-check me-2"></i>Prenota ora
            </Link>
            <Link to="/gallery" className="btn-hero-secondary">
              <i className="bi bi-images me-2"></i>Scopri la struttura
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <span className="section-label">Le nostre strutture</span>
            <h2>Due perle nel cuore del Salento</h2>
          </div>
          <div className="row align-items-center g-5">
            <div className="col-md-6 col-12">
              <div
                className="structure-card"
                onClick={() => navigate("/sternatia")}
              >
                <img src="/2.jpg" alt="Sternatia" className="structure-img" />
                <div className="structure-overlay">
                  <h3>Sternatia</h3>
                  <p>Nel borgo medievale, tra vicoli e storia</p>
                  <span className="structure-cta">
                    Scopri <i className="bi bi-arrow-right ms-1"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div
                className="structure-card"
                onClick={() => navigate("/corigliano")}
              >
                <img
                  src="/11.jpg"
                  alt="Corigliano d'Otranto"
                  className="structure-img"
                />
                <div className="structure-overlay">
                  <h3>Corigliano d'Otranto</h3>
                  <p>Tra il castello e i sapori autentici</p>
                  <span className="structure-cta">
                    Scopri <i className="bi bi-arrow-right ms-1"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {rooms.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <div className="section-title text-center mb-5">
              <span className="section-label">Le nostre camere</span>
              <h2>Comfort autentico</h2>
            </div>
            <div className="row justify-content-center g-4">
              {rooms.map((room) => (
                <div key={room.id} className="col-12 col-md-6 col-lg-4">
                  <div className="room-preview-card">
                    {room.imageUrl && (
                      <img src={room.imageUrl} alt={room.name} />
                    )}
                    <div className="room-preview-body">
                      <h4>{room.name}</h4>
                      <p>{room.description}</p>
                      <div className="room-preview-meta">
                        <span>
                          <i className="bi bi-rulers me-1"></i>
                          {room.pricePerNight} m²
                        </span>
                        {room.maxGuests && (
                          <span>
                            <i className="bi bi-people me-1"></i>max{" "}
                            {room.maxGuests}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <span className="section-label">Incluso nel soggiorno</span>
            <h2>I Nostri Servizi</h2>
          </div>
          <div className="row text-center g-4">
            {[
              {
                icon: "bi-wifi",
                title: "WiFi Gratuito",
                desc: "Connessione veloce in tutta la struttura",
              },
              {
                icon: "bi-cup-hot",
                title: "Colazione Inclusa",
                desc: "Colazione italiana completa ogni mattina",
              },
              {
                icon: "bi-car-front",
                title: "Parcheggio Privato",
                desc: "Parcheggio gratuito e sicuro",
              },
              {
                icon: "bi-book",
                title: "Consigli di Viaggio",
                desc: "Guide locali e suggerimenti personalizzati",
              },
              {
                icon: "bi-flower1",
                title: "Terrazzo Privato",
                desc: "Spazio esterno con vista panoramica",
              },
              {
                icon: "bi-chat-left-heart",
                title: "Ospitalità Salentina",
                desc: "Benvenuti con calore e autenticità",
              },
            ].map((s, i) => (
              <div key={i} className="col-12 col-md-4">
                <div className="service-card">
                  <i className={`bi ${s.icon} service-icon`}></i>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container">
            <div className="section-title text-center mb-5">
              <span className="section-label">Cosa dicono di noi</span>
              <h2>
                {[1, 2, 3, 4, 5].map((s) => (
                  <i key={s} className="bi bi-star-fill text-warning me-1"></i>
                ))}{" "}
                {avgRating}
              </h2>
            </div>
            <div className="row g-4">
              {reviews.slice(0, 6).map((r, i) => (
                <div key={i} className="col-12 col-md-6 col-lg-4">
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="booking-cta-section py-5">
        <div className="container text-center">
          <h2>Pronto per il tuo soggiorno nel Salento?</h2>
          <p>Camere disponibili per l'estate 2025. Prenota subito!</p>
          <Link to="/prenota" className="btn-cta-main">
            <i className="bi bi-calendar-check me-2"></i>Verifica disponibilità
          </Link>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="section-title text-center mb-4">
            <span className="section-label">Come raggiungerci</span>
            <h2>Siamo nel cuore del Salento</h2>
          </div>
          <div className="map-container">
            <iframe
              title="Le Mura degli Angeli"
              src="https://maps.google.com/maps?q=Sternatia,+Lecce&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
