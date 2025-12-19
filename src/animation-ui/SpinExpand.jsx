// SpinExpand.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function SpinExpand({ isOpen, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="expand"
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
