import { motion } from "framer-motion";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import "./projectDetails.css";

export default function ProjectDetails({ project, isMobile }) {
  if (!project) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
        {isMobile ? (
          <>
            <h1 className="text-3xl">Click on a Project</h1>
          </>
        ) : (
          <>
            <h1 className="text-3xl">Drag& Drop a Project</h1>
          </>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="p-8 w-full h-full overflow-y-auto custom-scrollbar text-white project-glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Title */}

      <h2 className="text-3xl font-bold text-emerald-300 mb-2">
        {project.title}
      </h2>

      {/* Date */}
      <p className="text-sm text-gray-400 mb-6">{project.date || ""}</p>

      {/* Image */}
      <div className="relative w-full h-4/5 overflow-hidden rounded-xl shadow-lg group mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="
    w-full h-full
    object-contain
    bg-black
    z-0
  "
          loading="lazy"
        />

        {/* Overlay */}
        <div className="overlay absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github || "#"}
            target={project.github !== "" ? "_blank" : ""}
            rel="noopener noreferrer"
            className="overlay-btn"
          >
            <FaGithub size={22} />
          </a>

          <a
            href={project.liveDemo || "#"}
            target={project.liveDemo !== "" ? "_blank" : ""}
            rel="noopener noreferrer"
            className="overlay-btn"
          >
            <BiLinkExternal size={22} />
          </a>
        </div>
      </div>

      {/* Technology Chips */}
      <div className="flex flex-wrap  gap-2 mb-6">
        <h1 className="text-2xl ">Technology used:</h1>
        <div>
          {project.technologyUsed.map((tech, idx) => (
            <span
              key={idx}
              className="
              inline-block
              bg-gray-800 
              text-gray-300 
              text-xs 
              px-3 
              py-1 
              mb-2
              rounded-full 
              border 
              border-emerald-600/30
            "
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <h1 className="text-2xl ">Description:</h1>

      <p className="text-gray-300 leading-relaxed mb-10">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex gap-4">
        {project.liveDemo !== "" && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-emerald-600 
              hover:bg-emerald-500 
              transition 
              text-black 
              font-semibold 
              px-4 
              py-2 
              rounded-lg
            "
          >
            Live Demo
          </a>
        )}

        {project.github !== "" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-gray-700 
              hover:bg-gray-600 
              transition 
              text-white 
              font-semibold 
              px-4 
              py-2 
              rounded-lg
            "
          >
            GitHub Repo
          </a>
        )}
      </div>
    </motion.div>
  );
}
