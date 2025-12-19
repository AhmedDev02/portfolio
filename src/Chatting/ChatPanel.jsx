import { useEffect, useRef, useState } from "react";
import { Cpu } from "lucide-react";

import ChatHeader from "./ChatHeader.jsx";
import ChatMessage from "./ChatMessage.jsx";
import ChatInput from "./ChatInput.jsx";
import { useThemeContext } from "../hooks/useThemeContext";

const CHAT_INITIAL_MESSAGE = {
  role: "ai",
  text: "Hello! I'm Ahmed Thatwat's Portfolio Assistant. I'm here to answer any questions about his background, expertise, or projects. Try asking me about his 'expertise' or 'background'!",
};

const ChatPanel = ({ onClose }) => {
  const { theme } = useThemeContext();
  const [messages, setMessages] = useState([CHAT_INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setIsLoading(true);

    const newUserMessage = { role: "user", text: trimmedInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:3001/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmedInput }),
      });

      if (!response.ok) throw new Error("Non-OK response from server");

      const data = await response.json();
      const newAiMessage = {
        role: "ai",
        text: data?.text || "⚠️ AI returned an empty response.",
      };

      setMessages((prev) => [...prev, newAiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ The AI server is offline or unreachable." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // THEME VALUES
  const containerBg =
    theme === "dark"
      ? "bg-gray-950 border-gray-800"
      : "bg-gray-100 border-gray-200";

  const chatBg = theme === "dark" ? "bg-gray-900" : "bg-gray-50";

  const typingAvatar = theme === "dark" ? "bg-gray-800" : "bg-gray-300";

  const typingBubble =
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-white border-gray-200 text-gray-900";

  const dotColor = theme === "dark" ? "bg-gray-400" : "bg-gray-500";

  return (
    <div
      className={`flex flex-col h-screen antialiased font-sans max-w-xl mx-auto border-x shadow-2xl z-40 ${containerBg} chat-scroll`}
    >
      <ChatHeader onClose={onClose} />

      {/* Messages area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 z-40 ${chatBg}`}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4 z-40">
            <div className="flex items-start max-w-[75%] flex-row">
              {/* Avatar */}
              <div
                className={`p-2 rounded-full shadow-md flex-shrink-0 mt-1 ${typingAvatar}`}
              >
                <Cpu className="w-4 h-4 text-white" />
              </div>

              {/* Bubble */}
              <div
                className={`mx-3 p-3 rounded-xl shadow-lg border rounded-tl-none ${typingBubble}`}
              >
                <div className="flex space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce delay-100 ${dotColor}`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce delay-300 ${dotColor}`}
                  ></div>
                  <div
                    className={`w-2 h-2 rounded-full animate-bounce delay-500 ${dotColor}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatPanel;
