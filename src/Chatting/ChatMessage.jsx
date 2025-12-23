import { Cpu, User } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";

const ChatMessage = ({ message }) => {
  const { theme } = useThemeContext();
  const isUser = message.role === "user";

  // ICON COLOR
  const iconColor = theme === "dark" ? "text-white" : "text-black";

  const roleIcon = isUser ? (
    <User className={`w-4 h-4 ${iconColor}`} />
  ) : (
    <img src={"./lightmodelogo.png"} className={`w-4 h-4 ${iconColor}`} />
  );

  // AVATAR CIRCLE
  const avatarBg = theme === "dark" ? "bg-gray-800" : "bg-gray-200";

  // CHAT BUBBLE
  const bubbleColor = isUser
    ? theme === "dark"
      ? "bg-emerald-600 text-white border-emerald-500"
      : "bg-emerald-100 text-gray-900 border-emerald-200"
    : theme === "dark"
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-gray-900 border-gray-200";

  // ALIGNMENT
  const alignment = isUser ? "justify-end" : "justify-start";

  // FORMATTED TEXT
  const formatText = (text) => {
    const parts = text?.split(/(\*\*.*?\*\*)/g)?.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold ">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    return parts?.flatMap((part, i) =>
      typeof part === "string" ? (
        part.split("\n").map((line, j) => (
          <span key={`${i}-${j}`} className="block mb-1 last:mb-0">
            {line}
          </span>
        ))
      ) : (
        <span key={i} className="block mb-1 last:mb-0">
          {part}
        </span>
      )
    );
  };

  return (
    <div className={`flex ${alignment} `}>
      <div
        className={`flex items-start max-w-[85%] sm:max-w-[75%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`p-2 rounded-full ${avatarBg} shadow-md flex-shrink-0 mt-1`}
        >
          {roleIcon}
        </div>

        {/* Bubble */}
        <div
          id="test"
          className={`mx-3 p-3 rounded-xl shadow-lg border ${bubbleColor} ${
            isUser ? "rounded-tr-none" : "rounded-tl-none"
          } transition-all duration-300`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-word">
            {formatText(message.text)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
