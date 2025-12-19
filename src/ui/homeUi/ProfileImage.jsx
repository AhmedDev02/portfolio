// ProfileImage.jsx
import "./ProfileImage.css";

export default function ProfileImage({ src, name }) {
  return (
    <a className="photo">
      <img src={src} alt={name} />
      <div className="glow-wrap">
        <i className="glow"></i>
      </div>
    </a>
  );
}
