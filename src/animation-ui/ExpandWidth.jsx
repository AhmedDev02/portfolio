// ExpandWidth.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function ExpandWidth({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="squareGrow"
          initial={{ width: 1, height: 1, opacity: 0 }}
          animate={{
            width: "60%",
            height: "50%",
            opacity: 1,
          }}
          exit={{
            width: 1,
            height: 1,
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          style={{
            overflow: "hidden",
            display: "inline-block", // needed to maintain shape
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
