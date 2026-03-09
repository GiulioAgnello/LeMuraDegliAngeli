export default function Story() {
  const timeline = [
    {
      year: "XVII sec.",
      title: "La costruzione",
      desc: "Il palazzo viene edificato in pietra leccese, destinato a famiglia nobile del borgo di Sternatia.",
    },
    {
      year: "1800s",
      title: "Secoli di vita",
      desc: "Generazioni si avvicendano tra quelle mura. Il palazzo testimonia la vita quotidiana del Salento profondo.",
    },
    {
      year: "2000s",
      title: "Il restauro",
      desc: "La famiglia decide di recuperare l'immobile nel rispetto dell'architettura originale: volte, cotto, pietra a vista.",
    },
    {
      year: "2020",
      title: "Il B&B nasce",
      desc: "Le Mura degli Angeli apre le porte ai viaggiatori. La missione: far vivere il Salento autentico.",
    },
    {
      year: "Oggi",
      title: "Due strutture",
      desc: "Sternatia e Corigliano d'Otranto accolgono ospiti da tutto il mondo, innamorati del Salento.",
    },
  ];

  return (
    <div className="story-page">
      <div className="story-hero">
        <h1>La Nostra Storia</h1>
        <p>Secoli di storia salentina, un'accoglienza di cuore</p>
      </div>

      <div className="container story-content">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-lg-6">
            <div className="story-intro">
              <span className="section-label">Chi siamo</span>
              <h2>Una famiglia, due borghi, un'anima sola</h2>
              <p>
                Le Mura degli Angeli è molto più di un B&B. È il frutto
                dell'amore di una famiglia salentina per la propria terra, per
                le pietre antiche, per i sapori genuini e per l'ospitalità
                autentica che caratterizza questa terra meravigliosa.
              </p>
              <p>
                Ogni mattina la colazione viene preparata con prodotti locali:
                olio extravergine pugliese, taralli artigianali, marmellate
                fatte in casa, e naturalmente il caffè del Bar del paese. Perché
                il Salento si vive anche a tavola.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="story-image-grid">
              <img
                src="/2.jpg"
                alt="La struttura"
                className="story-img story-img-main"
              />
              <img
                src="/11.jpg"
                alt="Corigliano"
                className="story-img story-img-secondary"
              />
            </div>
          </div>
        </div>

        <div className="story-timeline">
          <h2 className="text-center mb-5">Una storia lunga secoli</h2>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
              >
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="story-values">
          <h2 className="text-center mb-5">I nostri valori</h2>
          <div className="row g-4">
            {[
              {
                icon: "bi-heart",
                title: "Autenticità",
                desc: "Niente di finto, niente di costruito. Solo il Salento vero, quello delle nonne e delle feste patronali.",
              },
              {
                icon: "bi-leaf",
                title: "Sostenibilità",
                desc: "Raccolta differenziata, prodotti locali, risparmio idrico. Perché questa terra va preservata.",
              },
              {
                icon: "bi-people",
                title: "Ospitalità",
                desc: "Gli ospiti sono ospiti, non clienti. Vi accogliamo come si fa nel Salento: con tutto il cuore.",
              },
            ].map((v, i) => (
              <div key={i} className="col-md-4">
                <div className="value-card text-center">
                  <i className={`bi ${v.icon} value-icon`}></i>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
