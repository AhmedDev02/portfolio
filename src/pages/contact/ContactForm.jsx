import { useForm } from "react-hook-form";
import FadeRightToLeft from "../../animation-ui/FadeRightToLeft";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import PopUp from "./PopUp";

const CONTACT_URL = import.meta.env.VITE_CONTACT_FUNCTION_URL;
const MAX_CHARS = 1000;
export default function ContactForm({ onSent }) {
  const { theme } = useThemeContext();
  const { register, handleSubmit, watch, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const messageValue = watch("message") || "";

  const onSubmit = async (data) => {
    if (loading) return;

    const { name, email, message } = data;
    const enteredEmail = email.trim().toLowerCase();

    try {
      setLoading(true);

      /* =========================
         1️⃣ Ask backend for permission
      ========================= */
      const res = await fetch(import.meta.env.VITE_CONTACT_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }), // no token
      });
      const result = await res.json();

      if (res.status === 429) {
        await onSent();

        toast.custom((t) => (
          <PopUp
            t={t}
            message={
              result.cooldownType === "reuse"
                ? "You can reuse the same email 2 min after the last send."
                : "Daily limit reached. Try again later."
            }
          />
        ));
        return;
      }

      if (!res.ok) {
        throw new Error("Submission blocked");
      }

      /* =========================
         2️⃣ Send email via EmailJS
      ========================= */
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name,
          email: enteredEmail,
          message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.custom((t) => <PopUp t={t} message="Message sent successfully!" />);

      reset();
    } catch (err) {
      console.error(err);
      toast.custom((t) => (
        <PopUp t={t} message="Something went wrong. Please try again." />
      ));
    } finally {
      setLoading(false);
    }
  };

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
