import { MessageSquare } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext.js";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";

function ChatHeader({ onClose }) {
  const { theme } = useThemeContext();

  // Header background & border
  const headerStyle =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  // Icon background
  const iconBg = theme === "dark" ? "bg-gray-800" : "bg-gray-200";

  // Icon color
  const iconColor = theme === "dark" ? "text-white" : "text-black";

  // Title text color
  const titleColor = theme === "dark" ? "text-white" : "text-gray-800";

  return (
    <div
      className={`${headerStyle} justify-between border-b p-4 flex items-center shadow-md z-50`}
    >
      <div className={`${iconBg} p-3 rounded-full shadow-lg`}>
        <MessageSquare className={`${iconColor} w-5 h-5`} />
      </div>

      <h1 className={`text-xl font-bold ml-3 ${titleColor}`}>Ahmed GPT</h1>

      {theme !== "dark" ? (
        <IoIosCloseCircle
          onClick={onClose}
          className={`close-chat text-4xl ${
            theme === "dark" ? "text-amber-50" : "dark:text-gray-900"
          }`}
        />
      ) : (
        <IoIosCloseCircleOutline
          onClick={onClose}
          className={`close-chat text-4xl ${
            theme === "dark" ? "text-amber-50" : "dark:text-gray-900"
          }`}
        />
      )}
    </div>
  );
}

export default ChatHeader;
