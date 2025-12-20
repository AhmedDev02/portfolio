import { useEffect, useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";

import TextWriter from "../animation-ui/TextWriter";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Copyright from "./Copyright";
import DarkModeToggle from "./DarkModeToggle";
import useTheme from "../hooks/useTheme";
import { useThemeContext } from "../hooks/useThemeContext";
import LogoUpdated from "./LogoUpdated";
import { useUI } from "../hooks/useUI";
import {
  PiEyeClosedBold,
  PiEyeClosedDuotone,
  PiEyeClosedFill,
} from "react-icons/pi";
import { LiaEyeSlash } from "react-icons/lia";
import { FaEye, FaRegEye } from "react-icons/fa";

/* =======================
   Styled Components
======================= */

const SidebarWrapper = styled.aside`
  width: 100%;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 20%;
    min-height: 100vh;
  }
`;

const DesktopSidebar = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 1rem;
  }
`;

const MobileBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 33;
  background-color: ${({ $mode }) =>
    $mode === "dark" ? "#111827" : "#ffffff"};

  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 25px;
  left: 20px;
  font-size: 25px;
  z-index: 102;
  color: ${({ $dark }) => ($dark ? "#fff" : "#000")};
`;
const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $mode }) =>
    $mode === "dark" ? "#0f172a" : "#ffffff"};
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 300ms ease-in-out;
  overflow-y: auto;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

const MobileLogoWrapper = styled.div`
  position: relative;
  z-index: 41;
`;

/* =======================
   Component
======================= */

function SideBarUpdated() {
  const { theme } = useThemeContext();
  const { toggleDarkMode } = useTheme();
  const isDarkMode = theme === "dark";
  const [open, setOpen] = useState(false);
  const { eyeOpen, setEyeOpen } = useUI();
  const EyeIcon = eyeOpen
    ? isDarkMode
      ? FaRegEye
      : FaEye
    : isDarkMode
    ? PiEyeClosedBold
    : PiEyeClosedDuotone;

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";

      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";

      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";

      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";

      document.body.style.touchAction = "";
    };
  }, [open]);

  return (
    <SidebarWrapper>
      {/* =======================
          MOBILE SIDEBAR
      ======================= */}
      <MobileBar>
        <MobileLogoWrapper>
          <LogoUpdated dark={isDarkMode} isMobile />
        </MobileLogoWrapper>
        <DarkModeToggle
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          classStyles="absolute top-5 right-2 z-41"
        />
        <EyeIcon
          className={`block absolute top-15 right-4 text-4xl z-42 ${
            isDarkMode ? "text-emerald-700" : ""
          }`}
          onClick={() => setEyeOpen((prev) => !prev)}
        />
        <MenuButton
          $dark={isDarkMode}
          onClick={() => {
            setOpen((prev) => !prev);
            if (eyeOpen) {
              setEyeOpen((prev) => !prev);
            }
          }}
        >
          {open ? <RiCloseLine /> : <GiHamburgerMenu />}
        </MenuButton>
        <MobileOverlay $open={open} $mode={theme}>
          <NavBar
            onOpen={() => {
              setOpen(false);
              setEyeOpen(true);
            }}
          />
          <Copyright classStyles="absolute bottom-10" />
        </MobileOverlay>
      </MobileBar>

      {/* =======================
          DESKTOP SIDEBAR
      ======================= */}
      <DesktopSidebar className="side-bar z-30">
        <div className="z-30">
          <LogoUpdated dark={isDarkMode} />

          <TextWriter
            arrayOfTexts={[
              "Ahmed Tharwat",
              "Frontend Developer",
              "React Developer",
            ]}
          />

          <NavBar />
        </div>
        <div className="relative">
          <DarkModeToggle
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            classStyles="absolute z-36"
          />
        </div>
        <Copyright />
      </DesktopSidebar>
    </SidebarWrapper>
  );
}

export default SideBarUpdated;
