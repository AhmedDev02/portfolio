import { motion } from "framer-motion";

export default function RotateOnce({ children, active }) {
  return active ? (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: 0, // run ONLY once
      }}
    >
      {children}
    </motion.div>
  ) : (
    <>{children}</>
  );
}
