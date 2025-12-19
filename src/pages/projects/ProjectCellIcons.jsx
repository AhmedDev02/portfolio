import styled from "styled-components";
import { motion } from "framer-motion";

const IconsWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 10;
`;

const IconWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  will-change: transform;
  transform: translate(-50%, -50%);
`;

const RawIcon = ({ Icon, styling }) => (
  <Icon
    style={{
      color: styling.color,
      fontSize: styling.size,
    }}
  />
);

// random curved path for each icon
function randomExplosionPath(index, total) {
  const angle = (index / total) * Math.PI * 2; // evenly spaced around circle

  const radius = 25 + Math.random() * 60; // controlled distance

  // Curved mid point (bezier curve)
  const midRadius = radius * 0.5;

  return {
    x: [0, Math.cos(angle) * midRadius, Math.cos(angle) * radius],
    y: [0, Math.sin(angle) * midRadius, Math.sin(angle) * radius],
  };
}

const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.1,
    x: 0,
    y: 0,
  },
  show: (custom) => {
    const path = randomExplosionPath(custom.index, custom.total);

    return {
      opacity: 1,
      scale: 1,
      x: path.x,
      y: path.y,
      rotate: (Math.random() - 0.5) * 200,
      transition: {
        duration: 0.75,
        ease: "easeOut",
      },
    };
  },
  exit: {
    opacity: 0,
    scale: 0.2,
    x: 0,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

function ProjectCellIcons({ iconsConfig }) {
  return (
    <IconsWrapper
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        show: {
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {iconsConfig.map((cfg, index) => (
        <IconWrapper
          key={index}
          variants={iconVariants}
          custom={{ index, total: iconsConfig.length }}
        >
          <RawIcon Icon={cfg.icon} styling={cfg.styling} />
        </IconWrapper>
      ))}
    </IconsWrapper>
  );
}

export default ProjectCellIcons;
