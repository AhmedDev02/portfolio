// SlideFade.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function SlideFade({ isOpen, children }) {
  return (
    <AnimatePresence className="z-50">
      {isOpen && (
        <motion.div
          key="slide-fade"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
