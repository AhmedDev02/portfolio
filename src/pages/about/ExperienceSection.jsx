import { GoProjectSymlink } from "react-icons/go";
import { TimelineItem } from "./TimeLineItem";
import CallToAction from "./CallToAction";
import FadeLeftToRight from "../../animation-ui/FadeLeftToRight";

export function ExperienceSection() {
  return (
    <FadeLeftToRight delay={0.2}>
      <div className="flex flex-col h-full justify-between ">
        <h2 className="text-xl font-bold text-white mb-4">
          Experience<span className="text-white/40">.</span>
        </h2>
        <div className="border-b border-white/10 mb-6" />
        <TimelineItem
          title="3+ Years Building Web Applications"
          date="2022 – Present"
        />
        <TimelineItem title="+5 Real-World Projects" date="2025 – Present" />
        <CallToAction
          name="My Work"
          icon={GoProjectSymlink}
          link="/projects"
          internal
        />
      </div>
    </FadeLeftToRight>
  );
}
