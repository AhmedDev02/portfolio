import { motion } from "framer-motion";

function HomePulse({ children, active }) {
  return active ? (
    <motion.div
      // 1. Define the scale keyframes
      animate={{
        scale: [1, 1.25, 1], // Pulse up to 105% and back to 100%
      }}
      // 2. Define the transition properties
      transition={{
        duration: 1, // Time for the scale sequence (1 -> 1.05 -> 1)
        repeatDelay: 1.4, // Wait 1.4 seconds before the next loop starts
        repeat: 1, // Loop forever
        ease: "easeInOut", // Smooth start and end for the pulse
      }}
      style={{
        display: "inline-block",
        cursor: "default", // Changed to default since it's now a continuous display element
      }}
    >
      {children}
    </motion.div>
  ) : (
    <>{children}</>
  );
}

export default HomePulse;
