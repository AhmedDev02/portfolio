// animation-ui/FadeRight.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function FadeRight({ isVisible, children }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="fadeRight"
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
