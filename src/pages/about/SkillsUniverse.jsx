import { motion, AnimatePresence } from "framer-motion";
import { Code2, Paintbrush, Layers, Wrench } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  {
    name: "Core Web",
    icon: <Code2 size={22} />,
    color: "text-emerald-400",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Frontend Frameworks",
    icon: <Layers size={22} />,
    color: "text-indigo-400",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    name: "UI & Animation",
    icon: <Paintbrush size={22} />,
    color: "text-pink-400",
    skills: ["TailwindCSS", "Framer Motion", "Responsive Design"],
  },
  {
    name: "Developer Tools",
    icon: <Wrench size={22} />,
    color: "text-yellow-300",
    skills: ["Git", "APIs", "Webpack/Vite"],
  },
];

export default function SkillsUniverse() {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute w-[300px] h-[300px] bg-emerald-500/10 blur-3xl rounded-full"></div>

      {/* Smaller Galaxy Container */}
      <div className="relative w-[450px] h-[450px]">
        {/* Center Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-28 h-28 rounded-full bg-slate-900/60 backdrop-blur-lg
                     border border-emerald-500/30 shadow-xl flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-lg font-semibold text-emerald-300">Skills</span>
        </motion.div>

        {/* Orbiting Categories (Closer Orbit) */}
        {CATEGORIES.map((cat, i) => {
          const angle = (i / CATEGORIES.length) * Math.PI * 2;
          const radius = 100; // CLOSER ORBIT
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              onClick={() => setOpenCategory(openCategory === i ? null : i)}
              className="absolute cursor-pointer"
              animate={{ x, y }}
              transition={{ type: "spring", stiffness: 45 }}
            >
              <div
                className="w-16 h-16 rounded-full bg-slate-800/80 
                              border border-white/10 shadow-lg flex flex-col
                              items-center justify-center hover:bg-slate-700/80 
                              transition"
              >
                <div className={`${cat.color}`}>{cat.icon}</div>
                <p className="text-[9px] text-gray-300 mt-1 text-center px-1">
                  {cat.name}
                </p>
              </div>

              {/* Skill Satellites */}
              <AnimatePresence>
                {openCategory === i &&
                  cat.skills.map((skill, idx) => {
                    const offsetAngle = (idx / cat.skills.length) * Math.PI * 2;
                    const satelliteRadius = 70; // MAKE SATELLITES CLOSER

                    return (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          x: Math.cos(offsetAngle) * satelliteRadius,
                          y: Math.sin(offsetAngle) * satelliteRadius,
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 60 }}
                        className="absolute left-6 top-6 w-max"
                      >
                        <div
                          className="px-2 py-1 rounded-full bg-slate-700/70
                                        text-gray-200 border border-white/10 
                                        text-xs shadow"
                        >
                          {skill}
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
