export default function Homepage() {
  return (
    <>
      <div className="wrapper vh-100">
        <div className="herospace">
          <div className="container">
            <div className="logohero">
              <img src="\loghi\Le_Mura_degli_Angeli_clean.png" alt="svg" />
              <form>
                <h2>Chiedi disponibilità</h2>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 ">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 ">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        date di arrivo e partenza
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 col-md-6 col-lg-6">
              <h1>Comodità, relax e design</h1>
              <p>
                La nostra residenza coniuga il confort la sua storia e il design
                moderno. La residenza Le Mura degli Angeli è completamente
                indipendente e si sviluppa su tre livelli, offrendo spazi molto
                ampi e comodi. Ogni piano dispone di un bagno proprio: al piano
                terra si trovano la cucina, il tavolo da pranzo e un grande
                divano letto. Il primo piano include una zona studio e una
                camera da letto matrimoniale con bagno en suite. All’ultimo
                piano si trova un fantastico terrazzo, con una dependance dotata
                di un divano letto king size e un ulteriore bagno privato
                completo
              </p>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <div className="row g-2">
                <div className="col-6">
                  <img
                    src="\1.jpg"
                    alt="Struttura 1"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="public\2.jpg"
                    alt="Struttura 2"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="public\3.jpg"
                    alt="Struttura 3"
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-6">
                  <img
                    src="public\4.jpg"
                    alt="Struttura 4"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
