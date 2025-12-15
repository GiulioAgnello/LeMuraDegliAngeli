import { useState } from "react";
import "../styles/Gallery.css";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery data - replace with your actual images
  const galleryImages = [
    { id: 1, src: "public/1.jpg", alt: "Camera 1" },
    { id: 2, src: "public/2.jpg", alt: "Camera 2" },
    { id: 3, src: "public/3.jpg", alt: "Area Comune 1" },
    { id: 4, src: "public/4.jpg", alt: "Area Comune 2" },
    { id: 5, src: "public/5.jpg", alt: "Cucina" },
    { id: 6, src: "public/6.jpg", alt: "Bagno" },
    { id: 7, src: "public/7.jpg", alt: "Bagno" },
    { id: 8, src: "public/8.jpg", alt: "Bagno" },
    { id: 9, src: "public/9.jpg", alt: "Bagno" },
    { id: 10, src: "public/10.jpg", alt: "Bagno" },
    { id: 11, src: "public/11.jpg", alt: "Bagno" },
    { id: 12, src: "public/12.jpg", alt: "Bagno" },
    { id: 13, src: "public/13.jpg", alt: "Bagno" },
    { id: 14, src: "public/14.jpg", alt: "Bagno" },
    { id: 15, src: "public/15.jpg", alt: "Bagno" },
  ];

  return (
    <div className="gallery-container">
      <h1>Gallery</h1>

      {/* Thumbnail Grid */}
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <p>{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
