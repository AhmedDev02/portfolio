// OrbitLogo.jsx
export default function OrbitLogo({ src, size = 50 }) {
  return (
    <img
      src={src}
      className="orbit-item"
      style={{ width: size, height: size }}
      alt="orbit-icon"
    />
  );
}
