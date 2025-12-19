import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import ProjectCell from "./ProjectCell";

import PopOutDiv from "../../animation-ui/PopOutDiv";

function ProjectSlider({ projects, duration = 12, isMobile }) {
  const containerRef = useRef(null);
  const tweenRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cells = gsap.utils.toArray(".project-cell");
      if (!cells.length) return;

      const axis = isMobile ? "x" : "y";
      const sizeProp = isMobile ? "width" : "height";
      const startProp = isMobile ? "left" : "top";

      const firstRect = cells[0].getBoundingClientRect();
      const lastRect = cells[cells.length - 1].getBoundingClientRect();

      const totalSize =
        lastRect[startProp] + lastRect[sizeProp] - firstRect[startProp];

      // Initial positioning
      cells.forEach((cell, i) => {
        gsap.set(cell, {
          [axis]: i * lastRect[sizeProp],
        });
      });

      tweenRef.current = gsap.to(cells, {
        [axis]: `-=${totalSize}`,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          [axis]: (value) => (parseFloat(value) % totalSize) + "px",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects.length, duration, isMobile]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        if (!isMobile) tweenRef.current?.pause();
      }}
      onMouseLeave={() => {
        if (!isMobile) tweenRef.current?.resume();
      }}
      className={`
        relative overflow-hidden
        ${isMobile ? "h-[120px] w-full" : "h-[80vh] w-[200px]"}
      `}
    >
      <PopOutDiv>
        <div
          className={`
          ${isMobile ? "flex flex-row" : "flex flex-col"}
        `}
        >
          {[...projects, ...projects].map((project, i) => (
            <ProjectCell
              isMobile={isMobile}
              key={i}
              project={project}
              projectNumber={project.id}
            />
          ))}
        </div>
      </PopOutDiv>
    </div>
  );
}

export default ProjectSlider;
