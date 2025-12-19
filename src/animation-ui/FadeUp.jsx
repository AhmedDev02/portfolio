// FadeUp.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function FadeUp({ isVisible, children }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="fadeUp"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
