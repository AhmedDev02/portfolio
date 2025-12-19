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
import nodejs from "../../assets/icons/Nodejs.png";
import git from "../../assets/icons/GitHub.png";
import gitDark from "../../assets/icons/gitDark.png";
import firebase from "../../assets/icons/Firebase.png";
import express from "../../assets/icons/Express.png";
import expressDark from "../../assets/icons/ExpressDark.png";

import mongodb from "../../assets/icons/MongoDB.png";
import tailwind from "../../assets/icons/TailwindCSS.png";
import tailwindDark from "../../assets/icons/tailwindcssDark.png";

import { useThemeContext } from "../../hooks/useThemeContext";

export function SkillsSection() {
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
    { name: "Node.js", mode: theme !== "dark" ? nodejs : nodejs },
    { name: "git", mode: theme !== "dark" ? git : gitDark },
    { name: "firebase", mode: theme !== "dark" ? firebase : firebase },
    { name: "express", mode: theme !== "dark" ? express : expressDark },
    { name: "mongodb", mode: theme !== "dark" ? mongodb : mongodb },
    { name: "tailwind", mode: theme !== "dark" ? tailwind : tailwindDark },
  ];
  return (
    <section>
      <h2 className="text-xl font-bold text-white mb-4">
        {/* <span className="text-white/40">.</span> */}
      </h2>
      <div className="border-b border-white/10 mb-6" />

      {/* Mask */}
      <div className="overflow-hidden">
        {/* Track */}
        <div className="skills-track">
          {[...techLogos, ...techLogos].map((skill, i) => (
            <div
              key={i}
              className="
                skill-item
                min-w-[110px] h-[110px]
                flex flex-col items-center justify-center
                shrink-0
              "
            >
              <img
                src={skill.mode}
                alt={skill.name}
                className="w-20 h-auto object-contain"
                draggable={false}
                loading="lazy"
              />
              {/* <p className="mt-2 text-xs text-white/60">{skill?.name}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
