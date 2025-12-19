// Profile3DImage.jsx
import { useState } from "react";
import "./Profile3DImage.css";

export default function Profile3DImage({ src }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 15;
    const y = (rect.width / 2 - (e.clientX - rect.left)) / 15;

    setRotation({ x, y });
  };

  const reset = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="profile3d-wrapper"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <img src={src} alt="profile" className="profile3d-image" />
      <div
        className="profile3d-shadow"
        style={{
          transform: `translate(${rotation.y * 2}px, ${
            rotation.x * 2
          }px) scale(1.1)`,
        }}
      ></div>
    </div>
  );
}
