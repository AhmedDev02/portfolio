import styled from "styled-components";
import Number from "./Number";
import {
  TbHexagonNumber1,
  TbHexagonNumber3,
  TbHexagonNumber5,
  TbHexagonNumber7,
} from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { useThemeContext } from "../../hooks/useThemeContext";
import FadeUp from "../../animation-ui/FadeUp";

const Div = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  /* gap: %; */
  /* background-color: #1e293b; */
  justify-content: space-around;
  border-radius: 12px;
  margin-right: ${({ isMobile }) => (isMobile ? "0" : "60px")};
`;
const Block = styled.div`
  width: 20%;
  height: ${({ isMobile }) => (isMobile ? "100px" : "90%")};
  display: flex;
  padding: 2%;
  background-color: ${({ isDark }) => (!isDark ? "transparent" : " #fff")};
  flex-direction: column;
  border-radius: 12px;
  text-align: center;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px;
    transform: scale(1.05);
  }
`;
function ProjectsSummary({ isMobile }) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  return (
    <Div isMobile={isMobile}>
      <Block isMobile={isMobile} isDark={isDark}>
        <FadeUp isVisible={true}>
          <h3
            className={`text-black! font-extrabold ${isMobile && "text-xs"} `}
          >
            Projects
          </h3>
          <Number>
            <TbHexagonNumber1 className={`text-black! text-4xl`} />
            <TbHexagonNumber7 className={"text-black! text-4xl"} />
          </Number>
        </FadeUp>
      </Block>

      <Block isMobile={isMobile} isDark={isDark}>
        <FadeUp isVisible={true}>
          <h3
            className={`text-black! font-extrabold ${isMobile && "text-xs"} `}
          >
            Clients
          </h3>
          <Number>
            <TbHexagonNumber5 className={"text-black! text-4xl "} />
            <FaPlus className={"text-black! text-2xl "} />
          </Number>
        </FadeUp>
      </Block>
      <Block isMobile={isMobile} isDark={isDark}>
        <FadeUp isVisible={true}>
          <h3
            className={`text-black! font-extrabold ${isMobile && "text-xs"} `}
          >
            Working at
          </h3>
          <img
            className="w-10 ml-auto mr-auto"
            src="../../../public/localFameLogo.png"
          />
        </FadeUp>
      </Block>
      <Block isMobile={isMobile} isDark={isDark}>
        <FadeUp isVisible={true}>
          <h3
            className={`text-black! font-extrabold `}
            style={{ fontSize: `${isMobile ? "10px" : "16px"}` }}
          >
            Experience
          </h3>
          <Number>
            <TbHexagonNumber3
              className={`text-black! ${isMobile && "text-s"}`}
            />
            <FaPlus
              className={`text-black! text-2xl ${isMobile && "text-xs"}`}
            />
            <h3
              className={`text-black! text-2xl font-extrabold ${
                isMobile && "text-xs"
              } `}
            >
              Yrs
            </h3>
          </Number>
        </FadeUp>
      </Block>
    </Div>
  );
}

export default ProjectsSummary;
