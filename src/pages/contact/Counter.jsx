import { MdVisibility } from "react-icons/md";
import styled from "styled-components";
import { useThemeContext } from "../../hooks/useThemeContext";
import Eye from "./Eye";
import useIsMobile from "../../hooks/useIsMobile";
import DraggableWrapper from "./DraggableWrapper";

const Wrapper = styled.div`
  right: 20px;
  top: ${({ isMobile }) => (isMobile ? "10%" : "2%")};
  background: rgba(0, 0, 0, 0.2);
  height: 150px;
  width: 150px;
  position: absolute;
  padding: 10px 12px;
  display: ${({ isMobile }) => (isMobile ? "flex" : "inline-flex")};
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  z-index: 1;
  transform: ${({ isMobile }) =>
    isMobile ? "translate(80vw, 10vh)" : "translate(90vw, 2vh)"};
  &:active {
    cursor: grabbing;
  }
`;

const Digits = styled.div`
  display: flex;
  gap: 8px;
  z-index: 1;
`;

const DigitCard = styled.div`
  width: 30px;
  height: 50px;
  /* background: #ffffff1e; */
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const DigitBase = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  z-index: 1;
`;

const DigitTop = styled(DigitBase)`
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};

  z-index: 1;
`;

const DigitBottom = styled(DigitBase)`
  background: #f1f1f1;
  /* border-top: 1px solid #ddd; */
  z-index: 1;
`;

const Label = styled.div`
  margin-top: 16px;
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 600;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  z-index: 1;
`;

export default function Counter({ visitors = 346 }) {
  const isMobile = useIsMobile();
  const padded = String(visitors).padStart(2, "0");
  const { theme } = useThemeContext();
  if (isMobile) {
    return (
      <DraggableWrapper isMobile={isMobile}>
        {isMobile ? (
          <div className="absolute top-6 left-7 m-1">
            <Eye size={isMobile ? 0.35 : 0.7} />
          </div>
        ) : (
          <Eye size={isMobile ? 0.4 : 0.7} />
        )}
        <Digits className="relative">
          {padded.split("").map((digit, i) => (
            <DigitCard key={i}>
              <DigitTop theme={theme}>{digit}</DigitTop>
              <DigitBottom>{digit}</DigitBottom>
            </DigitCard>
          ))}
        </Digits>
        <Label theme={theme}>Visitors</Label>
      </DraggableWrapper>
    );
  }
  return (
    <DraggableWrapper height={150} width={150} isMobile={isMobile}>
      {isMobile ? (
        <div className="absolute top-3 left-9 m-1">
          <Eye size={isMobile ? 0.35 : 0.7} />
        </div>
      ) : (
        <div className="absolute top-5 left-5 m-1">
          <Eye size={isMobile ? 0.4 : 0.5} />
        </div>
      )}
      <Digits className="relative mt-7">
        {padded.split("").map((digit, i) => (
          <DigitCard key={i}>
            <DigitTop theme={theme}>{digit}</DigitTop>
            <DigitBottom>{digit}</DigitBottom>
          </DigitCard>
        ))}
      </Digits>
      <Label theme={theme}>visitors</Label>
    </DraggableWrapper>
  );
}
