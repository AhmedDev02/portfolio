import ProjectCard from "./ProjectCard";
import ProjectSlider from "./ProjectSlider";
import { arrayOfProjects } from "../../utils/data";
import styled from "styled-components";
import { useState } from "react";
import ProjectsSummary from "./ProjectsSummary";
import { useThemeContext } from "../../hooks/useThemeContext";
import useIsMobile from "../../hooks/useIsMobile";
import PopOutDiv from "../../animation-ui/PopOutDiv";

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ isDark }) => (isDark ? "#1e293b" : "transparent")};
  padding: 10px;
  width: 100%;
  border-radius: 12px;
  gap: 10px;
`;
const FilterButtons = styled.button`
  box-shadow: ${({ isActive }) =>
    isActive
      ? "rgb(38, 57, 77) 0px 20px 30px -10px;"
      : "box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};

  border: ${({ isActive }) => (isActive ? "2px solid black" : "none")};
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 6px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 10;
`;

function ProjectCardsContainer() {
  const [projects, setProjects] = useState("practical");
  function handleProjectsType(type) {
    setProjects(type);
  }
  const isMobile = useIsMobile();

  const { theme } = useThemeContext();
  if (isMobile) {
    return (
      <div className="flex w-full h-full align-center pt-5 flex-col">
        <div className="w-full flex flex-col-reverse align-center justify-center">
          <div className="w-full md:ml-9 relative ">
            <FilterDiv className="flex-row mt-2 mb-2" isDark={theme === "dark"}>
              <FilterButtons
                isActive={projects == "real-world"}
                onClick={() => handleProjectsType("real-world")}
              >
                Real-World
              </FilterButtons>

              <FilterButtons
                isActive={projects == "practical"}
                onClick={() => handleProjectsType("practical")}
              >
                Practical{" "}
              </FilterButtons>
            </FilterDiv>
          </div>

          <div className="w-full md:ml-9 flex rounded-2xl ">
            <ProjectsSummary isMobile={isMobile} />
          </div>
        </div>
        <div className="flex w-full flex-col justify-center items-center h-full relative">
          {/* <ProjectNumber number={9} /> */}
          <ProjectSlider
            isMobile={isMobile}
            projects={arrayOfProjects}
            duration={arrayOfProjects.length * 2}
          />
          <ProjectCard isMobile={isMobile} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full h-full align-center pt-5 flex-col">
      <div className="w-full flex ">
        <div className="w-1/5 md:ml-14  relative ">
          <PopOutDiv>
            <FilterDiv isDark={theme === "dark"}>
              <FilterButtons
                isActive={projects == "real-world"}
                onClick={() => handleProjectsType("real-world")}
              >
                Real-World{" "}
              </FilterButtons>
              <FilterButtons
                isActive={projects == "practical"}
                onClick={() => handleProjectsType("practical")}
              >
                Practical{" "}
              </FilterButtons>
            </FilterDiv>
          </PopOutDiv>
        </div>
        <div className="w-4/5 md:ml-9 flex rounded-2xl ">
          <ProjectsSummary isMobile={isMobile} />
        </div>
      </div>

      <div className="flex w-full justify-center items-center h-full relative">
        {/* <ProjectNumber number={9} /> */}
        <ProjectSlider
          projects={arrayOfProjects}
          duration={
            isMobile ? arrayOfProjects.length * 4 : arrayOfProjects.length * 2
          }
          isMobile={isMobile}
        />
        <ProjectCard isMobile={isMobile} />
      </div>
    </div>
  );
}

export default ProjectCardsContainer;
