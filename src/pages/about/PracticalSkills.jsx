import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaSass,
  FaJs,
  FaReact,
  FaVuejs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiVite,
  SiRubyonrails,
  SiNextdotjs,
} from "react-icons/si";

const SKILLS = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "Bootstrap", icon: FaBootstrap },
  { name: "SASS", icon: FaSass },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "JavaScript", icon: FaJs },
  { name: "React", icon: FaReact },
  { name: "Next", icon: SiNextdotjs },
  { name: "Vue", icon: FaVuejs },
  { name: "Vite", icon: SiVite },
  { name: "Rails", icon: SiRubyonrails },
  { name: "Python", icon: FaPython },
  { name: "AWS services", icon: FaAws },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
];

export default function PracticalSkills() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <p className="text-gray-500 mb-2">Explore My</p>
      <h2 className="text-4xl font-bold mb-16">Practical Skills</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6 place-items-center">
        {SKILLS.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-lg">
              <Icon className="w-7 h-7" />
              <span>{skill.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
