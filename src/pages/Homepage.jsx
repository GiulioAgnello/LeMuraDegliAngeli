import { useState, useEffect } from "react";

export default function Homepage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const RoomsCall = async () => {
      try {
        const response = await fetch("http://localhost:5214/api/Rooms/");
        const data = await response.json();
        setRooms(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
      }
    };

    RoomsCall();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center">
        <div className="typewriter-container text-center text-white">
          <div className="typewriter-text">
            Tranquillità, Comfort e Vitalenta...
          </div>
        </div>
      </section>

      {/* Presentazione */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <h2>Benvenuti</h2>
              <p>
                La nostra residenza coniuga il comfort, la storia e il design
                moderno. Completamente indipendente e sviluppata su tre livelli,
                offre spazi ampi e accoglienti.
              </p>
              <p>
                Perfetto per esplorare le spiagge e i borghi storici del
                Salento.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <img
                src="public\1.jpg"
                alt="Le Mura degli Angeli"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Galleria */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Scopri la Struttura</h2>
          <div className="row text-center display-flex justify-content-center">
            {rooms.map((room) => (
              <div className="col-3">
                <div key={room.id} className="mb-4">
                  <h4>{room.name}</h4>
                  <strong>Area: {room.pricePerNight} Mq</strong>
                  <p>{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servizi */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">I Nostri Servizi</h2>
          <div className="row text-center">
            <div className="col-12 col-md-4 mb-4">
              <i className="bi bi-wifi fs-3 text-primary mb-3"></i>
              <h5>WiFi Gratuito</h5>
              <p>Connessione veloce in tutta la struttura</p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <i className="bi bi-cup-hot fs-3 text-primary mb-3"></i>
              <h5>Colazione Inclusa</h5>
              <p>Colazione italiana completa ogni mattina</p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <i className="bi bi-car-front fs-3 text-primary mb-3"></i>
              <h5>Parcheggio Privato</h5>
              <p>Parcheggio gratuito e sicuro</p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <i className="bi bi-book fs-3 text-primary mb-3"></i>
              <h5>Consigli di Viaggio</h5>
              <p>Guide locali e suggerimenti personalizzati</p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <i className="bi bi-flower1 fs-3 text-primary mb-3"></i>
              <h5>Terrazzo Privato</h5>
              <p>Spazio esterno con vista panoramica</p>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <i className="bi bi-chat-left-heart fs-3 text-primary mb-3"></i>
              <h5>Ospitalità Salentina</h5>
              <p>Benvenuti con calore e autenticità</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Prenotazione */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Chiedi Disponibilità</h2>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dates" className="form-label">
                    Date di arrivo e partenza
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dates"
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Invia Richiesta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Posizione */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Dove Siamo</h2>
          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <h5>Strategia nel Salento</h5>
              <p>Situati nel cuore del Salento, siamo a pochi km da:</p>
              <ul>
                <li>Spiagge di Lecce e Porto Cesareo</li>
                <li>Centro storico di Lecce (Barocco leccese)</li>
                <li>Melendugno e le cale salentine</li>
                <li>Torre dell'Orso</li>
              </ul>
            </div>
            <div className="col-12 col-md-6">
              <img
                src="/images/mappa.jpg"
                alt="Mappa Salento"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
