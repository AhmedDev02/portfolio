// SpinButton.jsx
import { motion } from "framer-motion";

export default function SpinButton({ isOpen, children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={false}
      animate={{
        rotate: isOpen ? 180 : 0,
        scale: isOpen ? 0.7 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="p-4 rounded-full bg-emerald-600 text-white shadow-xl"
    >
      {children}
    </motion.button>
  );
}
