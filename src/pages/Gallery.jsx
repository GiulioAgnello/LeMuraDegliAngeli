import { useState } from "react";
import "../styles/Gallery.css";

const galleryImages = [
  { id: 1, src: "/1.jpg", alt: "Camera Matrimoniale", category: "camere" },
  { id: 2, src: "/2.jpg", alt: "Vista Esterna Sternatia", category: "esterni" },
  { id: 3, src: "/3.jpg", alt: "Sala da Pranzo", category: "comuni" },
  { id: 4, src: "/4.jpg", alt: "Cucina", category: "comuni" },
  { id: 5, src: "/5.jpg", alt: "Bagno", category: "camere" },
  { id: 6, src: "/6.jpg", alt: "Terrazzo", category: "esterni" },
  { id: 7, src: "/7.jpg", alt: "Camera Doppia", category: "camere" },
  {
    id: 8,
    src: "/8.jpg",
    alt: "Dettaglio Architettonico",
    category: "esterni",
  },
  { id: 9, src: "/9.jpg", alt: "Zona Relax", category: "comuni" },
  { id: 10, src: "/10.jpg", alt: "Borgo di Sternatia", category: "esterni" },
  { id: 11, src: "/11.jpg", alt: "Corigliano d'Otranto", category: "esterni" },
  { id: 12, src: "/12.jpg", alt: "Camera Suite", category: "camere" },
  { id: 13, src: "/13.jpg", alt: "Colazione", category: "comuni" },
  { id: 14, src: "/14.jpg", alt: "Vista Panoramica", category: "esterni" },
  { id: 15, src: "/15.jpg", alt: "Dettaglio Interno", category: "camere" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = [
    { key: "all", label: "Tutte" },
    { key: "camere", label: "Camere" },
    { key: "esterni", label: "Esterni" },
    { key: "comuni", label: "Spazi Comuni" },
  ];

  const filtered =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((i) => i.category === filter);
  const selectedIdx = selectedImage
    ? filtered.findIndex((i) => i.id === selectedImage.id)
    : -1;

  const prev = () => {
    if (selectedIdx > 0) setSelectedImage(filtered[selectedIdx - 1]);
  };
  const next = () => {
    if (selectedIdx < filtered.length - 1)
      setSelectedImage(filtered[selectedIdx + 1]);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1>Galleria</h1>
        <p>Lasciati ispirare dall'autenticità del Salento</p>
      </div>

      <div className="gallery-container">
        <div className="gallery-filters">
          {categories.map((c) => (
            <button
              key={c.key}
              className={`gallery-filter-btn ${filter === c.key ? "active" : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map((image, idx) => (
            <div
              key={image.id}
              className={`gallery-item ${idx % 5 === 0 || idx % 7 === 0 ? "gallery-item-large" : "gallery-item-normal"}`}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <div className="gallery-item-overlay">
                <i className="bi bi-zoom-in"></i>
                <span>{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <button
              className="lightbox-prev"
              onClick={prev}
              disabled={selectedIdx === 0}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <div className="lightbox-caption">
              {selectedImage.alt}{" "}
              <span className="lightbox-counter">
                {selectedIdx + 1} / {filtered.length}
              </span>
            </div>
            <button
              className="lightbox-next"
              onClick={next}
              disabled={selectedIdx === filtered.length - 1}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
