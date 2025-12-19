// src/animation-ui/PopOutDiv.jsx
import { motion } from "framer-motion";

export default function PopOutDiv({
  children,
  delay = 0,
  className = "",
  hover = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={
        hover
          ? {
              scale: 1.01,
              y: -4,
            }
          : undefined
      }
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 15,
        delay,
      }}
      className={`

        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
