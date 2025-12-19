import { LiaLinkedinIn } from "react-icons/lia";
import "./card.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
export default function Card() {
  return (
    <div className="card">
      <div className="card-img"></div>

      <ul className="social-media">
        <li>
          {/* Twitter */}
          <a href="https://x.com/Eng_Ahmed_02" target="_blank">
            <FaXTwitter />
          </a>
        </li>

        <li>
          {/* Web Icon */}
          <a
            href="https://www.linkedin.com/in/ahmed-tharwat02/"
            target="_blank"
          >
            <LiaLinkedinIn />
          </a>
        </li>

        <li>
          {/* Reddit */}
          <a href="https://github.com/AhmedDev02" target="_blank">
            <FaGithub />
          </a>
        </li>
      </ul>

      <div className="card-info">
        <p className="title">Ahmed Tharwat</p>
        <p className="subtitle">Web Developer</p>
      </div>
    </div>
  );
}
