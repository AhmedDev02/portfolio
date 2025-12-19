import { useThemeContext } from "../hooks/useThemeContext";
import ParticleBackground from "../particles/ParticleBackground";

function ContentContainer({ children }) {
  const { theme } = useThemeContext();

  return (
    <>
      <ParticleBackground theme={theme} />

      <div
        className={`w-full min-h-screen mx-auto md:w-4/5`}
        style={{ backgroundColor: theme === "dark" ? "#111827" : "" }}
      >
        {children}
      </div>
    </>
  );
}

export default ContentContainer;
