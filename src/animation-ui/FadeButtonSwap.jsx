// FadeSwap.jsx
import { motion } from "framer-motion";

export default function FadeButtonSwap({ show, children }) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 30,
        x: show ? 0 : 40,
        pointerEvents: show ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        width: "100%",
        bottom: "0",
        display: "flex",
        alignItems: "right",
        paddingLeft: "15%",
      }}
    >
      {children}
    </motion.div>
  );
}
