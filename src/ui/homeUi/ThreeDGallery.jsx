// ThreeDGallery.jsx
import "./ThreeDGallery.css";

export default function ThreeDGallery({ images, radius = 288 }) {
  return (
    <div className="gallery-container top-0 left-0">
      <div id="gallery-carousel">
        {images.map((img, i) => (
          <figure
            key={i}
            style={{
              transform: `rotateY(${
                i * (360 / images.length)
              }deg) translateZ(${radius}px)`,
            }}
          >
            <img src={img} alt={`gallery-${i}`} />
          </figure>
        ))}
      </div>
    </div>
  );
}
