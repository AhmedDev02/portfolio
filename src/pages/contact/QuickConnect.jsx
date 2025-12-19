import { useEffect, useState } from "react";
import { BsPatchExclamation, BsPatchExclamationFill } from "react-icons/bs";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { TbMailFast } from "react-icons/tb";
import styled from "styled-components";
import FadeUp from "../../animation-ui/FadeUp";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { useThemeContext } from "../../hooks/useThemeContext";
import PopOutLink from "../../animation-ui/PopOutLink";
import toast from "react-hot-toast";
import LoaderSpinning from "./LoaderSpinning";
import { findEmail, saveEmailTimestamp } from "../../services/contact";
import { checkCooldown } from "../../services/rateLimit";
import { sendFinalMessage } from "../../services/emailService";
import { supabase } from "../../../supabase";
import PopUp from "./PopUp";

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

export default function QuickConnect() {
  const [shortMSG, setShortMSG] = useState(false);
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [typedEmail, setTypedEmail] = useState("");

  const verifiedEmail = user?.email?.toLowerCase();
  const isSameEmail = !!user && typedEmail === verifiedEmail;

  // Load Supabase user on mount (and after redirect from magic link)
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    }
    loadUser();
  }, []);

  // Auto-fill input when user is verified / returns from link
  useEffect(() => {
    if (user?.email) {
      setTypedEmail(user.email.toLowerCase());
    }
  }, [user]);
  const isValidGmail = (email) => {
    return /^[^@\s]+@gmail\.com$/.test(email);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredEmail = typedEmail.trim().toLowerCase();
    if (!enteredEmail) {
      toast.error("Please enter an email.");
      setLoading(false);
      return;
    }
    if (!isValidGmail(enteredEmail)) {
      toast.custom(
        (t) => (
          <PopUp
            t={t}
            message={"Only Gmail addresses are supported at the moment."}
            customLink={false}
          />
        ),
        {
          duration: Infinity,
        }
      );
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Not verified OR email changed → request verification
      if (!user || enteredEmail !== verifiedEmail) {
        const { error } = await supabase.auth.signInWithOtp({
          email: enteredEmail,
          options: {
            emailRedirectTo: window.location.origin + "/contact",
          },
        });

        if (error) {
          console.error(error);
          toast.error("Failed to send verification email.");
        } else {
          toast.custom(
            (t) => (
              <PopUp
                t={t}
                message={"verification link is sent to you"}
                customLink={true}
              />
            ),
            {
              duration: Infinity,
            }
          );
        }

        setLoading(false);
        return;
      }

      // 2️⃣ Verified + email matches → Allow send
      const email = verifiedEmail;

      const { data: rows, error } = await findEmail(email);
      if (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
        setLoading(false);
        return;
      }

      const existing = rows?.[0];
      const cooldown = checkCooldown(existing);

      if (!cooldown.allowed) {
        toast.error(
          `Wait ${cooldown.hoursLeft} hour(s) before messaging again.`
        );
        setLoading(false);
        return;
      }

      // 3️⃣ Send email + save timestamp
      await sendFinalMessage(email);
      await saveEmailTimestamp(email);
      toast.success("Message sent!");

      // 4️⃣ Reset state: log out, clear input, button back to "Get verified"
      await supabase.auth.signOut();
      setUser(null);
      setTypedEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  function handleShortTextClick() {
    setShortMSG((shortMessage) => !shortMessage);
  }

  return (
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
            className="text-sm"
            // pattern="^[^@\s]+@gmail\.com$"
            value={typedEmail}
            onChange={(e) => setTypedEmail(e.target.value.toLowerCase())}
          />

          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderSpinning />
            ) : !user ? (
              "Get verified"
            ) : isSameEmail ? (
              <>
                Send <TbMailFast className="text-xl" />
              </>
            ) : (
              "Get verified"
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
  );
}
