import { useEffect, useState } from "react";
import "./projectCard.css";
import ProjectDetails from "./ProjectDetails";
import {
  clearSelectedProject,
  getSelectedProject,
} from "../../services/projectSelection";
import PopOutDiv from "../../animation-ui/PopOutDiv";
// import {
//   getSelectedProject,
//   clearSelectedProject,
// } from "../../utils/projectSelectionStore";

function ProjectCard({ isMobile }) {
  const [project, setProject] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("project");
    if (!data) return;
    const droppedProject = JSON.parse(data);
    setProject(droppedProject);
  };

  // ✅ MOBILE: read from shared store
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      const selected = getSelectedProject();
      if (selected) {
        setProject(selected);
        clearSelectedProject();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <PopOutDiv>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`
        project-screen
        relative
        ${isMobile ? "w-full h-[50vh]" : "w-[55vw] h-[70vh]"}
        overflow-hidden
        rounded-3xl
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        flex flex-col
        bg-black/5 dark:bg-white/5
        border border-black/20 dark:border-white/20
      `}
      >
        <ProjectDetails isMobile={isMobile} project={project} />
      </div>
    </PopOutDiv>
  );
}

export default ProjectCard;
