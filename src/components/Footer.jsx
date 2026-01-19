import React from "react";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function Footer() {
  const defaultProps = {
    center: {
      lat: 40.22099765864096,
      lng: 18.227172181072095,
    },
    zoom: 11,
  };

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
            <div style={{ height: "20vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
