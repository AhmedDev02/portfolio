import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../supabase";
import { sendFinalMessage } from "../../services/emailService";
import { saveEmailTimestamp } from "../../services/contact";
// import { sendFinalMessage } from "../../services/emailService";
// import { saveEmailTimestamp } from "../../services/contactDB";

export default function VerifiedPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.email_confirmed_at) {
        toast.success("Email verified!");
        setEmail(session.user.email);
      } else {
        toast.error("Verification failed.");
      }
    }

    checkSession();
  }, []);

  async function handleSend() {
    await sendFinalMessage(email);
    await saveEmailTimestamp(email);
    toast.success("Message sent!");
  }

  return (
    <div>
      <p>Your email has been verified!</p>
      {email && (
        <button onClick={handleSend} className="btn">
          Send Message
        </button>
      )}
    </div>
  );
}
