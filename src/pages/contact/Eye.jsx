import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

/* ---------------- Animations ---------------- */

// The blink animation now uses the scale variable
const blink = keyframes`
  0%, 90%, 100% {
    border-top-width: calc(30px * var(--scale));
    border-bottom-width: calc(20px * var(--scale));
  }
  92% {
    border-top-width: calc(76px * var(--scale));
    border-bottom-width: calc(76px * var(--scale));
  }
`;

const EyeWrapper = styled.div`
  /* Standard base size is 150px, multiplied by your size prop */
  --scale: ${({ size }) => size || 1};
  --base-dim: 150px;

  position: relative;
  width: calc(var(--base-dim) * var(--scale));
  height: calc(var(--base-dim) * var(--scale));
  border-radius: 60%;
  background: #f5f0f0;
  overflow: hidden;
  display: inline-block;
`;

const Iris = styled.div`
  position: absolute;
  width: 40%;
  height: 40%;
  border-radius: 60%;
  background: rgba(100, 155, 155, 0.9);
  box-shadow: inset 0 0 calc(30px * var(--scale)) calc(-5px * var(--scale))
    black;

  /* Positioning based on percentages for responsiveness */
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  transform: translate(-50%, -50%);
  transition: left 0.6s ease, top 0.6s ease;
`;

const Pupil = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  background: black;
  border-radius: 60%;
  left: 25%;
  top: 25%;
  box-shadow: 0 0 calc(20px * var(--scale)) white;
`;

const PupilShine = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  left: 60%;
  top: 20%;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 60%;
`;

const Lids = styled.div`
  position: absolute;
  inset: 0;
  /* Initial lid thickness scaled */
  border-top: calc(30px * var(--scale)) solid #e7b79b;
  border-bottom: calc(20px * var(--scale)) solid #e7b79b;
  border-radius: 60%;
  box-shadow: inset 0 0 calc(40px * var(--scale)) rgba(0, 0, 0, 0.4);
  pointer-events: none;

  animation: ${blink} ${({ blinkTime }) => blinkTime}s infinite;
`;

/* ---------------- Component ---------------- */

export default function Eye({ size = 1 }) {
  // x and y are percentages (0 to 100)
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [blinkTime, setBlinkTime] = useState(4);

  useEffect(() => {
    const move = () => {
      setPos({
        // Limits the movement so the Iris doesn't disappear behind the lids
        x: 35 + Math.random() * 30,
        y: 40 + Math.random() * 20,
      });
    };

    const interval = setInterval(move, 1200 + Math.random() * 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkTime(2 + Math.random() * 4);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <EyeWrapper size={size}>
      <Iris x={pos.x} y={pos.y}>
        <Pupil>
          <PupilShine />
        </Pupil>
      </Iris>
      <Lids blinkTime={blinkTime} />
    </EyeWrapper>
  );
}
