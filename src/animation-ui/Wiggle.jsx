import { motion } from "framer-motion";
function Wiggle({ children, active }) {
  // Define the animation details for the wiggle effect
  const wiggleVariants = {
    // The animation that runs when 'active' is true
    wiggle: {
      scale: 1.05, // Slight scale up for emphasis
      rotate: [0, -8, 8, -8, 8, 0], // Keyframes for the shake: start -> left -> right -> settle
    },
    // The transition properties, applied to both scale and rotate
    transition: {
      rotate: {
        duration: 0.35, // How fast the shake occurs
        ease: "easeInOut",
        repeat: 1,
        repeatType: "mirror", // Seamless loop
      },
      scale: {
        duration: 0.1, // Quick scale transition
      },
    },
  };

  return active ? (
    <motion.div
      // Apply the keyframed animation (wiggle) and transition when active is true
      animate={wiggleVariants.wiggle}
      transition={wiggleVariants.transition}
      style={{ display: "inline-block", cursor: "default" }}
    >
      {children}
    </motion.div>
  ) : (
    // Render children without the motion wrapper when not active
    <>{children}</>
  );
}

export default Wiggle;
