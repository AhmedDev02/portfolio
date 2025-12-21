import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import SocialIcons from "./SocialIcons";
import Tabs from "./Tabs";
import ContactForm from "./ContactForm";
import StatusBanner from "./StatusBanner";
import { findEmail, saveEmailTimestamp } from "../../services/contact";
import { checkCooldown } from "../../services/rateLimit";
import PopUp from "./PopUp";
import QuickConnectTurnstile from "./QuickConnectTurnstile";

export default function ContactHub() {
  const [cooldown, setCooldown] = useState(null);
  const [tab, setTab] = useState("quick");
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);

  const messageValue = watch("message") || "";
  const MAX_CHARS = 1000;

  const isValidGmail = (email) => /^[^\s@]+@gmail\.com$/i.test(email);

  const onSubmit = async (data) => {
    const { name, email, message } = data;
    const enteredEmail = email.trim().toLowerCase();
    if (loading) return; // prevents double submits
    setLoading(true);

    if (!enteredEmail) {
      toast.error("Please enter an email.");
      setLoading(false);

      return;
    }

    // ✅ Gmail-only enforcement
    if (!isValidGmail(enteredEmail)) {
      toast.custom(
        (t) => (
          <PopUp
            t={t}
            message="Only Gmail addresses are supported at the moment."
            customLink={false}
          />
        ),
        { duration: 6000 }
      );
      setLoading(false);

      return;
    }

    try {
      // 1️⃣ Check cooldown (24h rule)
      const { data: rows, error } = await findEmail(enteredEmail);
      if (error) throw error;

      const existing = rows?.[0];
      const cooldown = checkCooldown(existing);

      if (!cooldown.allowed) {
        toast.custom(
          (t) => (
            <PopUp
              t={t}
              message={`You can send a message with another mail, or the same mail in ${cooldown.hoursLeft} hour(s).`}
              customLink={false}
            />
          ),
          {
            duration: 10000,
          }
        );

        return;
      }

      // 2️⃣ Send message via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name,
          email: enteredEmail,
          message: message + enteredEmail,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 3️⃣ Save timestamp (locks email for 24h)
      await saveEmailTimestamp(enteredEmail);

      toast.custom(
        (t) => (
          <PopUp
            t={t}
            message={"Message sent successfully!"}
            customLink={false}
          />
        ),
        {
          duration: 4000,
        }
      );

      reset();
    } catch (err) {
      console.error(err);
      toast.error();
      toast.custom(
        (t) => (
          <PopUp
            t={t}
            message={"Something went wrong, please try again."}
            customLink={false}
          />
        ),
        {
          duration: 1000,
        }
      );
    } finally {
      setLoading(false); // ✅ always reset
    }
  };

  async function fetchCooldown() {
    const res = await fetch(import.meta.env.VITE_COOLDOWN_FUNCTION_URL, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });

    const data = await res.json();
    setRemaining(data.remaining);
    setCooldown(data);
  }
  useEffect(() => {
    fetchCooldown();
  }, []);
  return (
    <div className="w-full relative max-w-2xl mx-auto mt-15 p-6 bg-transparent rounded-xl shadow-sm">
      <SocialIcons />
      <Tabs tab={tab} setTab={setTab} />
      {tab === "quick" && (
        <QuickConnectTurnstile
          remaining={remaining}
          setRemaining={setRemaining}
          onSent={fetchCooldown}
        />
      )}
      {tab === "form" && (
        <ContactForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          MAX_CHARS={MAX_CHARS}
          messageValue={messageValue}
          loading={loading}
        />
      )}
      {tab === "quick" && (
        <StatusBanner remaining={remaining} cooldown={cooldown} />
      )}
      {
        <p className="text-xs block" style={{ marginTop: "20px" }}>
          When you submit the contact form, I process your email address and a
          hashed representation of your IP address for security, abuse
          prevention, and rate limiting. This data is automatically deleted
          within 24 hours and is not used for tracking or marketing.
        </p>
      }
    </div>
  );
}
