import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SkillsSection } from "./SkillsSection";

export default function SkillsEducationExperience() {
  return (
    <section className=" px-8  rounded-2xl">
      <div className="grid md:grid-cols-2 gap-16 ">
        <ExperienceSection />
        <EducationSection />
      </div>
      <SkillsSection />
    </section>
  );
}
