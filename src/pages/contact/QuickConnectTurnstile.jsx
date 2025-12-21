import { useEffect, useRef, useState } from "react";
import { BsPatchExclamation, BsPatchExclamationFill } from "react-icons/bs";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { TbMailFast } from "react-icons/tb";
import styled from "styled-components";
import FadeUp from "../../animation-ui/FadeUp";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { useThemeContext } from "../../hooks/useThemeContext";
import PopOutLink from "../../animation-ui/PopOutLink";
import LoaderSpinning from "./LoaderSpinning";
import { Turnstile } from "@marsidev/react-turnstile";
import toast from "react-hot-toast";
import PopUp from "./PopUp";
import emailjs from "emailjs-com";

const GmailImg = styled.img`
  animation: run 7s infinite ease-in-out;

  @keyframes run {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
const Form = styled.form`
  width: 80%;
  height: 20px;
`;
const Input = styled.input`
  width: 80%;
  height: 25px;
  padding: 0 10px;
  color: white;

  background-color: rgba(120, 120, 120, 0.63);
  &::placeholder {
    color: #ffffff85;
  }
`;

const Button = styled.button`
  position: absolute;
  display: flex;
  font-weight: 700;
  font-size: 10px;
  text-align: center;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  border: 1px dotted black;
  padding: 10px;
  bottom: 0.5rem;
  right: 1rem;
  border-radius: 10px;
  transition: all 0.3s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }
  &:disabled:hover {
    box-shadow: none;
  }
`;

const SpanSign = styled.span`
  top: -10px;
  left: -10px;
  position: absolute;
  color: red;
  font-size: larger;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  z-index: 10;
`;

const MessageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #ffffff;
  z-index: 10;
`;
const P = styled.p`
  padding: 0 20px;
  font-weight: bold;
  font-size: 15px;
  color: black !important;
`;
const FUNCTION_URL = import.meta.env.VITE_CONTACT_FUNCTION_URL;

export default function QuickConnectTurnstile({
  remaining,

  onSent,
}) {
  const [shortMSG, setShortMSG] = useState(false);
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const turnstileRef = useRef(null);

  // useEffect(() => {}, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.custom((t) => (
        <PopUp t={t} message="Please verify you are not a robot" />
      ));
      return;
    }

    try {
      setLoading(true);

      /* =========================
         1️⃣ Ask backend for permission
      ========================= */
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token, // Turnstile token
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        // ❌ blocked by cooldown or daily limit
        await onSent(); // refresh cooldown UI

        toast.custom((t) => (
          <PopUp
            t={t}
            message={
              data.cooldownType === "reuse"
                ? "You can reuse the same email after the timer."
                : "Daily limit reached. Try again later."
            }
          />
        ));
        return;
      }

      if (!res.ok) {
        throw new Error("Backend rejected send");
      }

      /* =========================
         2️⃣ Send via EmailJS
      ========================= */
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email,
          message:
            "Hello! Dropping a message to connect and build something awesome.",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.custom((t) => <PopUp t={t} message="Message sent successfully!" />);

      setEmail("");
      await onSent(); // refresh cooldown + remaining
    } catch (err) {
      console.error(err);
      toast.custom((t) => (
        <PopUp t={t} message="Something went wrong. Please try again." />
      ));
    } finally {
      setToken(null);
      turnstileRef.current?.reset();
      setLoading(false);
    }
  };
  function handleShortTextClick() {
    setShortMSG((shortMessage) => !shortMessage);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <PopOutLink className="cursor-default">
          {shortMSG && (
            <MessageDiv>
              <FadeUp isVisible={shortMSG}>
                <P className="text-center">The message</P>
                <RiDoubleQuotesL className="mr-auto text-black" />
                <P>
                  Hello! Dropping a message to connect and build something
                  awesome.
                </P>
                <RiDoubleQuotesR className="ml-auto text-black" />
              </FadeUp>
            </MessageDiv>
          )}

          {shortMSG ? (
            <SpanSign onClick={handleShortTextClick}>
              {theme === "dark" ? <IoCloseCircle /> : <IoCloseCircleOutline />}
            </SpanSign>
          ) : (
            <SpanSign onClick={handleShortTextClick}>
              {theme === "dark" ? (
                <BsPatchExclamationFill />
              ) : (
                <BsPatchExclamation />
              )}
            </SpanSign>
          )}

          <div className="flex items-center gap-3 mb-3 text-blue-600">
            <GmailImg src="/mailLogo.png" className="h-8 w-8" />
            <h3 className="font-semibold text-lg dark:text-black!">Gmail</h3>
            <h3 className="text-gray-500 text-sm dark:text-black!">
              <h3 className="text-gray-500 text-sm dark:text-black!">
                {remaining === null
                  ? "Checking availability..."
                  : remaining > 0
                  ? `${remaining} send${remaining === 1 ? "" : "s"} left`
                  : "Ran out of sends"}
              </h3>
            </h3>
          </div>
          <p className="text-gray-500 text-sm dark:text-black!">
            Automatic message will be sent!
          </p>

          <Form onSubmit={onSubmit}>
            <Input
              type="email"
              required
              placeholder="example@gmail.com"
              disabled={loading}
              className="text-sm "
              // pattern="^[^@\s]+@gmail\.com$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={setToken}
              onExpire={() => setToken(null)}
              options={{
                theme: theme === "dark" ? "dark" : "light",
                appearance: "interaction-only", // 🔥 THIS
              }}
            />

            <Button
              type="submit"
              disabled={loading || !token || remaining === 0}
            >
              {loading ? (
                <LoaderSpinning />
              ) : token ? (
                <>
                  Send <TbMailFast className="text-xl" />
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    Wait{" "}
                    <LoaderSpinning
                      color={theme === "dark" ? "#000000" : "#00944a74"}
                      styles={{ fontSize: "10px" }}
                    />
                  </span>
                </>
              )}
            </Button>
          </Form>
        </PopOutLink>

        <PopOutLink
          href="https://wa.me/201147516175"
          className="p-5 bg-gradient-to-br cursor-pointer from-purple-50 to-white rounded-xl border border-gray-200 hover:shadow transition"
          target="_blank"
        >
          <a href="https://wa.me/201147516175" target="_blank">
            <div className="flex items-center gap-3 mb-3 ">
              <img
                src="/whatsappLogo.png"
                className="h-8 w-8 rounded-full object-cover"
                alt="WhatsApp"
              />
              <h3 className="font-semibold text-lg dark:text-black!">
                WhatsApp message
              </h3>
            </div>
          </a>

          <p className="text-gray-800 font-medium dark:text-black!">
            Schedule a time slot
          </p>
          <p className="text-gray-500 text-sm dark:text-black!">
            Book a call on my calendar
          </p>
        </PopOutLink>
      </div>
    </>
  );
}
