// FadeIn.jsx
import { motion } from "framer-motion";

export default function FadeIn({ classStyles, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: delay,
      }}
      className={classStyles}
    >
      {children}
    </motion.div>
  );
}
