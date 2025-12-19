// OrbitAnimation.jsx
import "./OrbitAnimation.css";

export default function OrbitAnimation({
  children,
  radius = 160,
  duration = 8,
}) {
  return (
    <div
      className="orbit-container"
      style={{
        width: radius * 2,
        height: radius * 2,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}
