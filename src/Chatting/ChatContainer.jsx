import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ChatPanel from "./ChatPanel";
import FadeButtonSwap from "../animation-ui/FadeButtonSwap";
import CircularSpinButton from "./CircularSpinButton";
import FadeUpKeep from "../animation-ui/FadeUpKeep";
import FadeRightToLeft from "../animation-ui/FadeRightToLeft";
import FadeUp from "../animation-ui/FadeUp";
import styled from "styled-components";

const Span = styled.span`
  background: linear-gradient(120deg, #fff8a6 30%, #ffe86b 70%);
  border-radius: 4px;
  padding: 0 0.4em;
  display: inline-block;
  margin: 0 10px;
  font-weight: 800;
`;
function ChatContainer({ isMobile }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-w-1/3 z-37 relative">
      {!isMobile && (
        <div className="absolute ">
          <FadeUp isVisible={true}>
            <h1 className="text-2xl text-center font-extrabold mb-4">
              Got questions?
              <Span className="dark:text-emerald-900">Let’s chat</Span>
            </h1>
          </FadeUp>
        </div>
      )}
      {/* BUTTON — visible only when chat is closed */}
      <FadeButtonSwap show={!isChatOpen}>
        <CircularSpinButton
          isMobile={isMobile}
          onClick={() => setIsChatOpen(true)}
          icon={<MessageSquare size={22} />}
        />
      </FadeButtonSwap>
      <FadeUpKeep show={isChatOpen}>
        <ChatPanel onClose={() => setIsChatOpen(false)} />
      </FadeUpKeep>
    </div>
  );
}

export default ChatContainer;
