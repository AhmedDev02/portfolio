import { Send } from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";

const ChatInput = ({ input, setInput, handleSendMessage, isLoading }) => {
  const { theme } = useThemeContext();

  // INPUT BAR BACKGROUND + BORDER
  const formBg =
    theme === "dark"
      ? "bg-gray-900 border-gray-800"
      : "bg-white border-gray-200";

  // INPUT FIELD STYLE
  const inputStyle =
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500";

  return (
    <form
      onSubmit={handleSendMessage}
      className={`p-4 border-t flex-shrink-0 ${formBg} z-40`}
    >
      <div className="flex items-center space-x-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          rows={1}
          className={`resize-none overflow-hidden whitespace-pre-wrap break-words flex-1 p-3 rounded-xl  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 shadow-inner text-sm ${inputStyle} h-15 md:h-20 `}
          disabled={isLoading}
        />

        <button
          type="submit"
          className={`p-3 rounded-xl text-white shadow-lg transition duration-300 ease-in-out ${
            input.trim() && !isLoading
              ? "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
              : "bg-emerald-300 cursor-not-allowed"
          }`}
          disabled={!input.trim() || isLoading}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
