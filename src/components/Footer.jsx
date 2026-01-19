export default function Footer() {
  return (
    <>
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
    </>
  );
}
