import { motion } from "framer-motion";

const DropDownComponent = ({ children }) => {
  // Define the animation properties
  const dropVariants = {
    // 1. Initial state (off-screen above and invisible)
    initial: {
      y: -150, // Starts 150px above its final position
      opacity: 0,
      scale: 0.8, // Slightly smaller to enhance the drop/scale effect
    },
    // 2. Animation state (final position and fully visible)
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    // 3. Transition properties (how the animation moves)
    transition: {
      type: "spring", // Use a spring for a natural bounce effect
      stiffness: 100, // Lower stiffness means a softer bounce
      damping: 10, // Higher damping means the bounce settles faster
      delay: 0.2, // Optional: wait a moment before dropping
    },
  };

  return (
    <motion.div
      variants={dropVariants}
      initial="initial"
      animate="animate"
      // Pass the transition directly to motion.div for simpler use
      transition={dropVariants.transition}
      style={{
        display: "inline",
        height: "0",
        width: "0",
        zIndex: 80,
      }}
    >
      {/* The content that is dropping */}
      {children ? children : <h2>Hello, I just dropped in!</h2>}
    </motion.div>
  );
};
export default DropDownComponent;
