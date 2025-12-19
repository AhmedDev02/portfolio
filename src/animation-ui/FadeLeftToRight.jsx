import { motion } from "framer-motion";
function FadeLeftToRight({ children, delay = 1 }) {
  const fadeInFromLeft = {
    // 1. Initial State (off-screen and invisible)
    hidden: {
      opacity: 0,
      x: -50,
    },
    // 2. Animated State (final position and visible)
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8, // Speed of the transition (0.8 seconds)
        ease: "easeOut",
        // --- ADDED DELAY PROPERTY ---
        delay: delay, // Waits 1.5 seconds before starting the fade-in animation
      },
    },
  };
  return (
    <motion.div
      // Attach the variant object
      variants={fadeInFromLeft}
      // Set the starting state
      initial="hidden"
      // Set the ending state (which triggers the animation)
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export default FadeLeftToRight;
