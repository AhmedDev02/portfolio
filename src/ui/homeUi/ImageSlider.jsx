import "./imageSlider.css";
import html from "../../assets/icons/html.png";
import htmlDark from "../../assets/icons/htmlDark.png";

import css from "../../assets/icons/css.png";
import cssDark from "../../assets/icons/cssDark.png";
import js from "../../assets/icons/js.png";
import jsDark from "../../assets/icons/jsDark.png";

import typescript from "../../assets/icons/typescript.png";
import typescriptDark from "../../assets/icons/typescriptDark.png";

import react from "../../assets/icons/react.png";
import reactDark from "../../assets/icons/reactDark.png";

import nextjs from "../../assets/icons/nextjs.png";
import nextjsDark from "../../assets/icons/nextjsDark.png";
import { useThemeContext } from "../../hooks/useThemeContext";

function ImageSlider() {
  const { theme } = useThemeContext();

  const techLogos = [
    { name: "HTML", mode: theme !== "dark" ? html : htmlDark },
    { name: "CSS", mode: theme !== "dark" ? css : cssDark },
    { name: "JavaScript", mode: theme !== "dark" ? js : jsDark },
    {
      name: "TypeScript",
      mode: theme !== "dark" ? typescript : typescriptDark,
    },
    { name: "React", mode: theme !== "dark" ? react : reactDark },
    { name: "Next.js", mode: theme !== "dark" ? nextjs : nextjsDark },
  ];
  return (
    <div className="card-3d">
      {techLogos.map((item, index) => (
        <img key={index} src={item.mode} alt={item.name} />
      ))}
    </div>
  );
}

export default ImageSlider;
