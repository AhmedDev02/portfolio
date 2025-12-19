// import { useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Code2,
//   Braces,
//   GitBranch,
//   Atom,
//   Layers,
//   Type,
//   Paintbrush,
//   Rocket,
//   Flag,
// } from "lucide-react";
// import { FaGithub, FaJs, FaReact } from "react-icons/fa";
// import {
//   RiJavascriptLine,
//   RiNextjsLine,
//   RiTailwindCssLine,
// } from "react-icons/ri";
// import { TbBrandTypescript } from "react-icons/tb";
// import useIsMobile from "../../hooks/useIsMobile";
// /**
//  * Frontend Journey Map — Curved Neon Path
//  * Tailwind required, Framer Motion required.
//  */

// const NODES = [
//   {
//     id: "start",
//     title: "Started Frontend",
//     subtitle: "",
//     icon: Flag,
//     glow: "emerald",
//     details:
//       "Began the journey with HTML & CSS together and started building layouts.",
//   },
//   {
//     id: "htmlcss",
//     title: "HTML + CSS",
//     subtitle: "",
//     icon: Code2,
//     glow: "emerald",
//     details:
//       "Semantic HTML, modern CSS, layouts, responsive habits formed here.",
//   },
//   {
//     id: "js",
//     title: "JavaScript",
//     subtitle: "",
//     icon: FaJs,
//     glow: "cyan",
//     details: "DOM, events, async mindset, and building actual interactive UI.",
//   },
//   {
//     id: "git",
//     title: "Git",
//     subtitle: "",
//     icon: FaGithub,
//     glow: "violet",
//     details: "Workflow discipline: branches, PR mindset, clean commits.",
//   },
//   {
//     id: "react",
//     title: "React",
//     subtitle: "",
//     icon: FaReact,
//     glow: "indigo",
//     details:
//       "Reusable components, state, hooks, animations, real apps started.",
//   },
//   {
//     id: "next",
//     title: "Next.js",
//     subtitle: "",
//     icon: RiNextjsLine,
//     glow: "pink",
//     details: "Routing, SSR/SSG, performance, real deployment mentality.",
//   },
//   {
//     id: "ts",
//     title: "TypeScript",
//     subtitle: "",
//     icon: TbBrandTypescript,
//     glow: "blue",
//     details: "Typed props, safer refactors, clearer architecture.",
//   },
//   {
//     id: "tailwind",
//     title: "Tailwind CSS",
//     subtitle: "",
//     icon: RiTailwindCssLine,
//     glow: "yellow",
//     details: "Design systems, rapid UI iteration, consistent spacing & style.",
//   },
// ];

// // Curved path points (percent-based for responsiveness)
// // Desktop (your current path — keep it)
// const DESKTOP_PATH_POINTS = [
//   { x: 8, y: 78 },
//   { x: 18, y: 60 },
//   { x: 30, y: 68 },
//   { x: 42, y: 46 },
//   { x: 54, y: 54 },
//   { x: 66, y: 36 },
//   { x: 76, y: 44 },
//   { x: 86, y: 26 },
// ];

// // Mobile zig-zag (→ then ↓ then ← then ↓ then → ...)
// const MOBILE_PATH_POINTS = [
//   { x: 20, y: 10 }, // →
//   { x: 80, y: 10 }, // →
//   { x: 80, y: 22 }, // ↓
//   { x: 20, y: 22 }, // ←
//   { x: 20, y: 34 }, // ↓
//   { x: 80, y: 34 }, // →
//   { x: 80, y: 46 }, // ↓
//   { x: 20, y: 46 }, // ←
// ];

// export default function FrontendJourneyMap() {
//   const [activeId, setActiveId] = useState(null);

//   const isMobile = useIsMobile();

//   const nodes = useMemo(() => {
//     const points = isMobile ? MOBILE_PATH_POINTS : DESKTOP_PATH_POINTS;
//     return NODES.map((n, i) => {
//       const p = points[Math.min(i, points.length - 1)];
//       return { ...n, px: p.x, py: p.y };
//     });
//   }, [isMobile]);
//   // random stars

//   const stars = useMemo(
//     () =>
//       Array.from({ length: 28 }).map((_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         top: Math.random() * 100,
//         size: 1 + Math.random() * 2.2,
//         dur: 3 + Math.random() * 4,
//         delay: Math.random() * 2,
//       })),
//     []
//   );

//   const points = isMobile ? MOBILE_PATH_POINTS : DESKTOP_PATH_POINTS;

//   return (
//     <div className="relative w-full ml-10 h-full min-h-[420px] ">
//       {/* subtle grid */}
//       <div className="absolute inset-0 opacity-[0.06]" />

//       {/* floating stars */}
//       {stars.map((s) => (
//         <motion.span
//           key={s.id}
//           className="absolute rounded-full bg-white/80"
//           style={{
//             left: `${s.left}%`,
//             top: `${s.top}%`,
//             width: s.size,
//             height: s.size,
//           }}
//           animate={{ opacity: [0.2, 1, 0.2] }}
//           transition={{
//             duration: s.dur,
//             repeat: Infinity,
//             delay: s.delay,
//             ease: "easeInOut",
//           }}
//         />
//       ))}

//       {/* SVG curved neon track */}
//       <svg
//         className="absolute inset-0 w-full h-full "
//         viewBox="0 0 100 100"
//         preserveAspectRatio="none"
//       >
//         <defs className="">
//           <linearGradient id="neon" x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
//             <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
//             <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
//           </linearGradient>
//           <filter id="glow">
//             <feGaussianBlur stdDeviation="0.7" result="coloredBlur" />
//             <feMerge>
//               <feMergeNode in="coloredBlur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>

//         {/* path (thick, glowing) */}
//         <path
//           d={`
//             M ${points[0].x} ${points[0].y}
//             Q ${points[1].x} ${points[1].y},
//               ${points[2].x} ${points[2].y}
//             T ${points[3].x} ${points[3].y}
//             T ${points[4].x} ${points[4].y}
//             T ${points[5].x} ${points[5].y}
//             T ${points[6].x} ${points[6].y}
//             T ${points[7].x} ${points[7].y}
//           `}
//           fill="none"
//           stroke="url(#neon)"
//           strokeWidth="1.6"
//           filter="url(#glow)"
//           opacity="0.85"
//         />

//         {/* thin track under it */}
//         <path
//           d={`
//             M ${points[0].x} ${points[0].y}
//             Q ${points[1].x} ${points[1].y},
//               ${points[2].x} ${points[2].y}
//             T ${points[3].x} ${points[3].y}
//             T ${points[4].x} ${points[4].y}
//             T ${points[5].x} ${points[5].y}
//             T ${points[6].x} ${points[6].y}
//             T ${points[7].x} ${points[7].y}
//           `}
//           fill="none"
//           stroke="white"
//           strokeWidth="0.2"
//           opacity="0.2"
//         />
//       </svg>

//       {/* moving "data dot" along curve */}
//       <motion.div
//         className="absolute  w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_18px_6px_rgba(52,211,153,0.7)]"
//         style={{
//           offsetPath: `${
//             isMobile
//               ? "path('M 20 12 L 80 22 L 20 34 L 80 46 L 20 58 L 80 70 L 20 82 L 80 92')"
//               : "path('M 8 78 Q 18 60 30 68 T 42 46 T 54 54 T 66 36 T 76 44 T 86 26')"
//           }`,
//         }}
//         animate={{ offsetDistance: ["0%", "100%"] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />

//       {/* nodes */}
//       {nodes.map((n, i) => {
//         const Icon = n.icon;
//         const isActive = activeId === n.id;

//         const glowClass =
//           n.glow === "emerald"
//             ? "shadow-[0_0_25px_4px_rgba(52,211,153,0.6)] border-emerald-400/50"
//             : n.glow === "cyan"
//             ? "shadow-[0_0_25px_4px_rgba(34,211,238,0.6)] border-cyan-400/50"
//             : n.glow === "violet"
//             ? "shadow-[0_0_25px_4px_rgba(167,139,250,0.6)] border-violet-400/50"
//             : n.glow === "indigo"
//             ? "shadow-[0_0_25px_4px_rgba(99,102,241,0.6)] border-indigo-400/50"
//             : n.glow === "pink"
//             ? "shadow-[0_0_25px_4px_rgba(236,72,153,0.6)] border-pink-400/50"
//             : n.glow === "blue"
//             ? "shadow-[0_0_25px_4px_rgba(59,130,246,0.6)] border-blue-400/50"
//             : "shadow-[0_0_25px_4px_rgba(250,204,21,0.6)] border-yellow-300/50";

//         return (
//           <motion.button
//             key={n.id}
//             onClick={() => setActiveId(isActive ? null : n.id)}
//             className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
//             style={{ left: `${n.px}%`, top: `${n.py}%` }}
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{
//               scale: 1,
//               opacity: 1,
//               transition: { delay: i * 0.08 },
//             }}
//           >
//             <motion.div
//               whileHover={{ scale: 1.08 }}
//               className={[
//                 "relative w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-md",
//                 "border flex items-center justify-center",
//                 glowClass,
//                 n.isMilestone ? "ring-2 ring-white/10" : "",
//               ].join(" ")}
//             >
//               <Icon className="text-white/90" size={22} />

//               {/* pulse halo */}
//               <motion.div
//                 className="absolute inset-0 rounded-full border border-white/10"
//                 animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
//                 transition={{
//                   duration: 2.8,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               />
//             </motion.div>

//             {/* label */}
//             <div className="mt-2 text-center">
//               <p className="text-xs text-white/90 font-medium">{n.title}</p>
//               <p className="text-[10px] text-white/50">{n.subtitle}</p>
//             </div>
//           </motion.button>
//         );
//       })}

//       {/* floating info card */}
//       <AnimatePresence>
//         {activeId && (
//           <motion.div
//             initial={{ opacity: 0, y: 8, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 8, scale: 0.98 }}
//             transition={{ duration: 0.2 }}
//             className="absolute -bottom-15 left-1/2 -translate-x-1/2 w-[92%] md:w-[70%]
//                        rounded-2xl bg-slate-900/90 border border-white/10
//                        shadow-[0_0_40px_0_rgba(16,185,129,0.15)]
//                        p-4 backdrop-blur-lg"
//           >
//             {(() => {
//               const node = nodes.find((x) => x.id === activeId);
//               if (!node) return null;
//               return (
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
//                     <node.icon size={18} className="text-white/90" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="!text-white font-semibold text-sm">
//                       {node.title}
//                     </h3>
//                     <p className="!text-white/60 text-xs mt-0.5">
//                       {node.subtitle}
//                     </p>
//                     <p className="!text-white text-sm mt-2 leading-relaxed">
//                       {node.details}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })()}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* top-right mini legend */}
//       <div
//         id="map-guide"
//         className="absolute top-4 left-4 text-[10px]  text-black bg-white/5 border border-white/10 rounded-full px-3 py-1"
//       >
//         Click nodes to explore!
//       </div>
//     </div>
//   );
// }
