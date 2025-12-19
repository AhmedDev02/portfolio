import { LiaLinkedin } from "react-icons/lia";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import styled from "styled-components";
import { useThemeContext } from "../../hooks/useThemeContext";
import useIsMobile from "../../hooks/useIsMobile";

const A = styled.a`
  &:hover {
    color: ;
  }
`;

export default function SocialIcons() {
  const { theme } = useThemeContext();
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex ${
        isMobile ? "left-30 -top-5.5 " : "left-65 -top-5.5 "
      } absolute justify-center gap-6 mb-6 dark:text-gray-400 text-gray-600`}
    >
      <a
        href="https://www.linkedin.com/in/ahmed-tharwat02/"
        target="_blank"
        // className="dark:hover:text-white hover:text-black"
        className={theme === "dark" ? "hover:text-white" : "hover:text-black"}
      >
        <LiaLinkedin className="text-3xl" />
      </a>
      <a
        href="https://github.com/AhmedDev02"
        target="_blank"
        className={theme === "dark" ? "hover:text-white" : "hover:text-black"}
      >
        <BsGithub className="text-3xl" />
      </a>
      <a
        href="https://x.com/Eng_Ahmed_02"
        target="_blank"
        className={theme === "dark" ? "hover:text-white" : "hover:text-black"}
      >
        <BsTwitterX className="text-3xl" />
      </a>
    </div>
  );
}
