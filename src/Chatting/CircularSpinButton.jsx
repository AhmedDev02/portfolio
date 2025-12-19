// CircularSpinButton.jsx
import { motion } from "framer-motion";

export default function CircularSpinButton({
  onClick,
  isOpen,
  icon,
  isMobile,
}) {
  if (isMobile) {
    return (
      <div
        className="relative self-end w-30 ml-auto h-30 flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        {/* Spinning circular text */}
        <motion.div
          className="absolute right-0 inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full /5 h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="circlePath"
                d="
              M 50, 50
              m -35, 0
              a 35,35 0 1,1 70,0
              a 35,35 0 1,1 -70,0
              "
              />
            </defs>

            <text
              fontSize="10"
              letterSpacing="2"
              className="fill-emerald-600 font-semibold"
            >
              <textPath href="#circlePath">
                TALK TO ME · · TALK TO ME · ·
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Button with your SpinButton animation */}
        <motion.button
          onClick={onClick}
          initial={false}
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="
          w-14 h-14 rounded-full 
          bg-emerald-600 text-white 
          shadow-xl flex items-center justify-center 
          hover:bg-emerald-700 transition
        "
        >
          {icon}
        </motion.button>
      </div>
    );
  }
  return (
    <div
      className="relative self-end w-30  h-30 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {/* Spinning circular text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full /5 h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="circlePath"
              d="
              M 50, 50
              m -35, 0
              a 35,35 0 1,1 70,0
              a 35,35 0 1,1 -70,0
              "
            />
          </defs>

          <text
            fontSize="10"
            letterSpacing="2"
            className="fill-emerald-600 font-semibold"
          >
            <textPath href="#circlePath">
              TALK TO ME · · TALK TO ME · ·
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Button with your SpinButton animation */}
      <motion.button
        onClick={onClick}
        initial={false}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="
          w-14 h-14 rounded-full 
          bg-emerald-600 text-white 
          shadow-xl flex items-center justify-center 
          hover:bg-emerald-700 transition
        "
      >
        {icon}
      </motion.button>
    </div>
  );
}
