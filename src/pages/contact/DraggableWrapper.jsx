import { useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed; /* Changed to fixed so coordinates match window precisely */
  left: 0;
  top: 0;
  height: ${({ height }) => height || "120px"};
  width: ${({ width }) => width || "120px"};
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 12px;
  display: ${({ isMobile }) => (isMobile ? "flex" : "inline-flex")};
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  z-index: 39;
  cursor: grab;
  touch-action: none;
  /* Start at the top right */
  transform: ${({ isMobile }) =>
    isMobile ? "translate(80vw, 10vh)" : "translate(90vw, 2vh)"};

  &:active {
    cursor: grabbing;
  }
`;

export default function DraggableWrapper({
  children,
  isMobile,
  height,
  width,
}) {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const last = useRef({ x: 0, y: 0, t: 0 });
  const raf = useRef(null);

  const friction = 0.98; // Increased slightly for smoother movement
  const bounce = 0.8; // Energy kept after hitting a wall

  // Sync the internal pos.current with the actual element position on mount
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      pos.current = { x: rect.left, y: rect.top };
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset physics
    pos.current = { x: 0, y: 0 };
    velocity.current = { x: 0, y: 0 };
    last.current = { x: 0, y: 0, t: 0 };

    cancelAnimationFrame(raf.current);

    // Reset visual position (match your CSS start)
    const x = isMobile ? window.innerWidth * 0.8 : window.innerWidth * 0.9;
    const y = isMobile ? window.innerHeight * 0.1 : window.innerHeight * 0.02;

    pos.current = { x, y };
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [isMobile]);

  const animate = () => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    // Apply velocity to position
    pos.current.x += velocity.current.x;
    pos.current.y += velocity.current.y;

    /* --- Bounce Logic --- */

    // X axis (Left/Right)
    if (pos.current.x <= 0) {
      pos.current.x = 0;
      velocity.current.x *= -bounce; // Reverse direction
    } else if (pos.current.x >= maxX) {
      pos.current.x = maxX;
      velocity.current.x *= -bounce; // Reverse direction
    }

    // Y axis (Top/Bottom)
    if (pos.current.y <= 0) {
      pos.current.y = 0;
      velocity.current.y *= -bounce; // Reverse direction
    } else if (pos.current.y >= maxY) {
      pos.current.y = maxY;
      velocity.current.y *= -bounce; // Reverse direction
    }

    // Apply Friction
    velocity.current.x *= friction;
    velocity.current.y *= friction;

    // Update Visuals
    el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

    // Stop animation if it's barely moving
    if (
      Math.abs(velocity.current.x) > 0.1 ||
      Math.abs(velocity.current.y) > 0.1
    ) {
      raf.current = requestAnimationFrame(animate);
    }
  };

  const onPointerDown = (e) => {
    const el = ref.current;
    el.setPointerCapture(e.pointerId);
    cancelAnimationFrame(raf.current);

    // Capture starting point
    last.current = {
      x: e.clientX,
      y: e.clientY,
      t: performance.now(),
    };

    const move = (e) => {
      const now = performance.now();
      const dt = now - last.current.t || 16;

      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;

      pos.current.x += dx;
      pos.current.y += dy;

      // Calculate velocity based on drag speed
      velocity.current.x = (dx / dt) * 16;
      velocity.current.y = (dy / dt) * 16;

      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

      last.current = { x: e.clientX, y: e.clientY, t: now };
    };

    const up = () => {
      el.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <Wrapper
      key={isMobile ? "mobile-eye" : "desktop-eye"}
      ref={ref}
      isMobile={isMobile}
      onPointerDown={onPointerDown}
    >
      {children}
    </Wrapper>
  );
}
