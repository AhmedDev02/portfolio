import FadeLeftToRight from "../../animation-ui/FadeLeftToRight";
import CallToAction from "./CallToAction";
import { TimelineItem } from "./TimeLineItem";
import { IoMdDownload } from "react-icons/io";

export function EducationSection() {
  return (
    <FadeLeftToRight delay={0.4}>
      <div className="flex flex-col h-full justify-between ">
        <h2 className="text-xl font-bold text-white mb-4">
          Education<span className="text-white/40">.</span>
        </h2>
        <div className="border-b border-white/10 mb-6" />
        <TimelineItem
          title="BSc Computer& System Engineering"
          date="2020 – 2025"
        />
        <TimelineItem
          title="5 Certificates in Web Development"
          place="Udemy Academy"
          date="2022 – 2024"
        />
        <CallToAction
          name="My Resume"
          icon={IoMdDownload}
          link={"/Ahmed_Khalil_CV.pdf"}
          download
        />
      </div>
    </FadeLeftToRight>
  );
}
