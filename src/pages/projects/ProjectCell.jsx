import "./projectCell.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaCss3Alt, FaHtml5, FaJs, FaReact } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import ProjectCellIcons from "./ProjectCellIcons";
import SlideFade from "../../animation-ui/SlideFade";
import { setSelectedProject } from "../../services/projectSelection";

const reactStyling = {
  color: "#379df2",
  size: "1.2rem",
};

const jsStyling = {
  color: "#FAD604",
  size: "1.2rem",
};

const htmlStyling = {
  color: "#FC4503",
  size: "1.2rem",
};

const cssStyling = {
  color: "#3478C1",
  size: "1.2rem",
};

const nextStyling = {
  color: "#1B1B1B",
  size: "1.2rem",
};

const tailwindStyling = {
  color: "#06B6D4",
  size: "1.2rem",
};

const tsStyling = {
  color: "#3178C6",
  size: "1.2rem",
};

const iconsConfig = [
  { icon: FaReact, styling: reactStyling },
  { icon: FaJs, styling: jsStyling },
  { icon: FaHtml5, styling: htmlStyling },
  { icon: FaCss3Alt, styling: cssStyling },
  { icon: RiNextjsFill, styling: nextStyling },
  { icon: RiTailwindCssFill, styling: tailwindStyling },
  { icon: BiLogoTypescript, styling: tsStyling },
];

function ProjectCell({ project, projectNumber, isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="
        project-cell
        w-[180px]
        h-[100px]
        rounded-lg
        cursor-grab
        relative
        group
        shrink-0
      "
        draggable={!isMobile}
        onDragStart={(e) => {
          if (isMobile) return;
          e.dataTransfer.setData("project", JSON.stringify(project));
        }}
        onClick={() => {
          if (isMobile) {
            // ✅ THIS replaces dataTransfer on mobile
            setSelectedProject(project);
          }
        }}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
      >
        {hovered ? (
          <SlideFade isOpen={hovered}>
            <h1
              className="absolute top-10 p-20 z-50 w-full text-center text-emerald-950! bg-amber-50 -left-18 -rotate-90 flip"
              style={{ fontSize: "10px" }}
            >
              {project?.title}{" "}
            </h1>
          </SlideFade>
        ) : (
          <h1
            className="absolute top-10 p-10  z-50 w-full text-center text-emerald-950! bg-amber-50 -left-18 -rotate-90 flip"
            style={{ fontSize: "13px" }}
          >
            Project #{projectNumber}
          </h1>
        )}
        <AnimatePresence>
          {hovered && <ProjectCellIcons iconsConfig={iconsConfig} />}
        </AnimatePresence>

        <div className="relative group w-full h-full">
          <div
            className="
    absolute inset-0 
    opacity-0 
    bg-black/30 
    group-hover:opacity-100 
    backdrop-blur-md 
    transition-all 
    duration-300
  "
          ></div>

          <img
            className={`w-full h-full ${
              isMobile ? "object-fit" : "object-cover"
            } pointer-events-none`}
            src={project?.image}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default ProjectCell;
