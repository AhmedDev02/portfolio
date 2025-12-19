import { motion } from "framer-motion";

export default function Floating({ children, active }) {
  return active ? (
    <motion.span
      animate={{
        y: [0, -5, 0], // float up & down
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        // ease: "",
      }}
    >
      {children}
    </motion.span>
  ) : (
    <>{children}</>
  );
}
