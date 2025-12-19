import ChatContainer from "../../Chatting/ChatContainer";
import useIsMobile from "../../hooks/useIsMobile";

import SkillsEducationExperience from "./SkillsEducationExperience";

function LetsTalk() {
  const isMobile = useIsMobile();
  console.log(isMobile);
  if (isMobile) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="w-full">{<SkillsEducationExperience />}</div>
        <div
          className="absolute  bg-emerald-200 "
          style={{
            boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
          }}
        >
          <ChatContainer isMobile={isMobile} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-center justify-center flex-row">
      <div className="min-w-2/3">{<SkillsEducationExperience />}</div>
      <div
        className="min-w-1/3 bg-emerald-200 "
        style={{
          boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <ChatContainer />
      </div>
    </div>
  );
}

export default LetsTalk;
