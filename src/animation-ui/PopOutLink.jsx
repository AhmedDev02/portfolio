// src/animation-ui/PopOutLink.jsx
import { motion } from "framer-motion";

export default function PopOutLink({
  children,
  href = "",
  delay = 0,
  className = "",
  target,
}) {
  if (!href)
    return (
      <motion.a
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{
          scale: 1.01,
          y: -4,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 15,
          delay,
        }}
        className={`
        p-5 relative bg-gradient-to-br
        from-blue-50 to-white
        rounded-xl border border-gray-200
        hover:shadow transition
        block
        ${className}
      `}
      >
        {children}
      </motion.a>
    );
  return (
    <motion.a
      href={href}
      target={target || null}
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{
        scale: 1.01,
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 15,
        delay,
      }}
      className={`
        p-5 relative bg-gradient-to-br
        from-blue-50 to-white
        rounded-xl border border-gray-200
        hover:shadow transition
        block
        ${className}
      `}
    >
      {children}
    </motion.a>
  );
}
