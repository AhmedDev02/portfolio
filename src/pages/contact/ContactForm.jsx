import FadeRightToLeft from "../../animation-ui/FadeRightToLeft";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function ContactForm({
  register,
  handleSubmit,
  onSubmit,
  MAX_CHARS,
  messageValue,
  loading,
}) {
  const { theme } = useThemeContext();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FadeRightToLeft delay={0}>
          <div>
            <label
              className={`
    text-sm font-semibold
    ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
  `}
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Your name"
              className={`w-full mt-1 p-3 rounded-lg border-2 outline-none ${
                theme === "dark"
                  ? "border-white text-white"
                  : "border-black text-black"
              }`}
            />
          </div>
        </FadeRightToLeft>
        <FadeRightToLeft delay={0.2}>
          <div>
            <label
              className={`
    text-sm font-semibold
    ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
  `}
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="yourname@gmail.com"
              className={`w-full mt-1 p-3 rounded-lg border-2 outline-none ${
                theme === "dark"
                  ? "border-white text-white"
                  : "border-black text-black"
              }`}
            />
          </div>
        </FadeRightToLeft>
      </div>
      <FadeRightToLeft delay={0.4}>
        <div>
          <label
            className={`
    text-sm font-semibold
    ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
  `}
          >
            Message
          </label>
          <textarea
            {...register("message", { required: true })}
            placeholder="What would you like to discuss?"
            className={`
  w-full mt-1 p-3 rounded-lg border-2 outline-none h-[120px] resize-none 
  ${theme === "dark" ? "border-white text-white" : "border-black text-black"}
`}
          />
          <div className="text-right text-xs text-gray-500">
            {messageValue.length}/{MAX_CHARS}
          </div>
        </div>
      </FadeRightToLeft>

      <button
        type="submit"
        disabled={loading}
        className={`cursor-pointer w-full py-3 mt-2 rounded-xl text-white font-semibold flex items-center justify-center gap-2
    bg-gradient-to-r from-emerald-400 to-emerald-600
    ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"}
  `}
      >
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
