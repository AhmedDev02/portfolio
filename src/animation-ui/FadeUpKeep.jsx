// FadeUpKeep.jsx
import { motion } from "framer-motion";

export default function FadeUpKeep({ show, children }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 30,
        pointerEvents: show ? "auto" : "none",
        height: show ? "auto" : 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      style={{
        overflow: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
}
