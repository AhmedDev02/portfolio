import TextWriter from "../animation-ui/TextWriter";
import useTheme from "../Hooks/useTheme";
import Copyright from "./Copyright";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";
import NavBar from "./NavBar";
import useIsMobile from "../hooks/useIsMobile";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";
import styled from "styled-components";

const Menu = styled.button`
  position: absolute;
  top: 25px;
  left: 20px;
  font-size: 25px;
  z-index: 101;

  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
`;
export const MenuDiv = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) =>
    theme === "dark" ? "#0f172a" : "#ffffff"};

  overflow-y: auto; /* ✅ allow scrolling inside menu */
  -webkit-overflow-scrolling: touch;

  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  transition: transform 300ms ease-in-out;
`;
function SideBar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <aside
        className={`${
          isMobile
            ? "w-full flex justify-center flex-row items-center relative"
            : "w-1/5 min-h-screen p-4 side-bar flex flex-col justify-between z-30"
        } `}
      >
        <div>
          <Logo dark={isDarkMode} isMobile={isMobile} />
          {!isMobile && (
            <>
              <TextWriter
                arrayOfTexts={[
                  "Ahmed Tharwat",
                  "Frontend Developer",
                  "React Developer",
                ]}
              />

              <NavBar />
            </>
          )}
        </div>

        <DarkModeToggle
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          classStyles={isMobile ? "absolute top-5 right-2" : ""}
        />
        {isMobile && (
          <Menu
            className="md:hidden "
            isDarkMode={isDarkMode}
            onClick={() => setOpen((opened) => !opened)}
          >
            {open ? <RiCloseLine /> : <GiHamburgerMenu />}
          </Menu>
        )}
        {!isMobile && <Copyright />}
        {/* {open && <></>} */}
        {
          <MenuDiv open={open} theme={isDarkMode ? "dark" : "light"}>
            <NavBar onOpen={() => setOpen((opened) => !opened)} />
            {isMobile && <Copyright classStyles="absolute bottom-10" />}
          </MenuDiv>
        }
      </aside>
    </>
  );
}
export default SideBar;
