// Jump.jsx
import { motion } from "framer-motion";

export default function Jump({
  children,
  delay = 0,
  duration = 2,
  amplitude = 4,
  repeat = Infinity,
  classStyles = "",
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-amplitude, 0, -amplitude],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: repeat,
        ease: "easeInOut",
      }}
      className={"inline-block " + classStyles}
    >
      {children}
    </motion.div>
  );
}
