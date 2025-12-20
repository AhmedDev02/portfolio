import { NavLink, useLocation } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import {
  FaFaceGrinBeam,
  FaFaceMeh,
  FaRegFaceLaughBeam,
  FaRegFaceMeh,
} from "react-icons/fa6";
import { MdContactPhone, MdOutlineContactPhone } from "react-icons/md";
import RotateOnce from "../animation-ui/RotateOnce";
import { useEffect, useState } from "react";
import Wiggle from "../animation-ui/Wiggle";
import HomePulse from "../animation-ui/HomePulse";
import FadeLeftToRight from "../animation-ui/FadeLeftToRight";

const ActiveFunction = ({ isActive }) => {
  return isActive ? "activeNav nav-link" : "inActiveNav nav-link";
};

function NavBar({ onOpen }) {
  const { theme } = useThemeContext();
  const isDarkMode = theme === "dark";
  const { pathname } = useLocation();
  const [urlText, setUrlText] = useState(pathname);

  useEffect(() => {
    setUrlText(pathname);
  }, [pathname]);

  return (
    <nav className="nav-bar flex flex-col gap-4 mt-8 z-70">
      <FadeLeftToRight delay={0.5}>
        <NavLink to="/home" className={ActiveFunction} onClick={onOpen}>
          {isDarkMode ? (
            <HomePulse active={urlText === "/home"}>
              <AiOutlineHome className="svg-nav" />
            </HomePulse>
          ) : (
            <HomePulse active={urlText === "/home"}>
              <AiFillHome className="svg-nav" />
            </HomePulse>
          )}
          Home
        </NavLink>
      </FadeLeftToRight>
      <FadeLeftToRight delay={1}>
        <NavLink to="/about" className={ActiveFunction} onClick={onOpen}>
          {urlText === "/about" ? (
            isDarkMode ? (
              <FaRegFaceLaughBeam className="svg-nav" />
            ) : (
              <FaFaceGrinBeam className="svg-nav" />
            )
          ) : isDarkMode ? (
            <FaRegFaceMeh className="svg-nav" />
          ) : (
            <FaFaceMeh className="svg-nav" />
          )}
          About me{" "}
        </NavLink>
      </FadeLeftToRight>
      <FadeLeftToRight delay={1.4}>
        <NavLink to="/projects" className={ActiveFunction} onClick={onOpen}>
          {isDarkMode ? (
            <RotateOnce active={urlText === "/projects"}>
              <FaLaptopCode className="svg-nav" />
            </RotateOnce>
          ) : (
            <RotateOnce active={urlText === "/projects"}>
              <LiaLaptopCodeSolid className="svg-nav" />
            </RotateOnce>
          )}
          Projects
        </NavLink>
      </FadeLeftToRight>
      <FadeLeftToRight delay={1.8}>
        <NavLink to="/contact" className={ActiveFunction} onClick={onOpen}>
          {isDarkMode ? (
            <Wiggle active={urlText === "/contact"}>
              <MdOutlineContactPhone className="svg-nav" />
            </Wiggle>
          ) : (
            <Wiggle active={urlText === "/contact"}>
              <MdContactPhone className="svg-nav" />
            </Wiggle>
          )}
          Contact
        </NavLink>
      </FadeLeftToRight>
    </nav>
  );
}

export default NavBar;
