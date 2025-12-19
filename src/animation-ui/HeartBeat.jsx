import { motion } from "framer-motion";

export default function HeartBeat({ children }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1], // pulse once
      }}
      transition={{
        duration: 1, // pulse speed
        repeatDelay: 1.4, // wait after the pulse (total = 3 seconds)
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
