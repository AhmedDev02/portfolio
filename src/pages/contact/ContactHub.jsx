import { useCallback, useEffect, useState } from "react";
import SocialIcons from "./SocialIcons";
import Tabs from "./Tabs";
import ContactForm from "./ContactForm";
import StatusBanner from "./StatusBanner";
import QuickConnectTurnstile from "./QuickConnectTurnstile";

export default function ContactHub() {
  const [cooldown, setCooldown] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [tab, setTab] = useState("quick");

  const fetchCooldown = useCallback(async () => {
    const res = await fetch(import.meta.env.VITE_COOLDOWN_FUNCTION_URL, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });

    const data = await res.json();
    setRemaining(data.remaining);
    setCooldown(data);
  }, []);

  useEffect(() => {
    fetchCooldown();
  }, [fetchCooldown]);
  return (
    <div className="w-full relative max-w-2xl mx-auto mt-15 p-6 bg-transparent rounded-xl shadow-sm">
      <SocialIcons />
      <Tabs tab={tab} setTab={setTab} />
      {tab === "quick" && (
        <QuickConnectTurnstile
          remaining={remaining}
          // setRemaining={setRemaining}
          onSent={fetchCooldown}
        />
      )}
      {tab === "form" && <ContactForm onSent={fetchCooldown} />}
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
