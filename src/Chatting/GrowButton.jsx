// GrowButton.jsx
import { motion } from "framer-motion";

export default function GrowButton({ isOpen, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      initial={false}
      animate={{
        scale: isOpen ? 0.8 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="p-4 rounded-full bg-emerald-600 text-white shadow-xl"
    >
      {children}
    </motion.button>
  );
}
