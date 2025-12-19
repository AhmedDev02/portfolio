// import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // <-- you need this import
import { useEffect, useMemo, useState } from "react";

function ParticleBackground({ theme }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: false, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: theme === "light" ? "#000" : "#ffffff" },
        links: {
          color: { value: theme === "light" ? "#000" : "#ffffff" },
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: { enable: true, speed: 6, outModes: { default: "bounce" } },
        number: { value: 100, limit: 120, density: { enable: true } },

        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [theme]
  );

  if (!init) return null;
  return (
    // 1. New Wrapper for 20% width and full height
    <div
      // Tailwind classes: w-1/5 (20% width), h-screen (full viewport height)
      // Added absolute positioning to place it correctly as a background element
      className="w-1/5 h-screen absolute top-0 left-0"
      // The style prop is now cleaner as Tailwind handles dimensions
    >
      {/* Particles fills the container (the 20% section) */}
      <Particles
        id="tsparticles"
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default ParticleBackground;
