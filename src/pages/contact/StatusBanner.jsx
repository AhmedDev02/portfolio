import styled from "styled-components";
import FadeIn from "../../animation-ui/FadeIn";
import { BiMailSend } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import PieTimer from "./PieTimer";
import toast from "react-hot-toast";
import PopUp from "./PopUp";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const H4 = styled.h4`
  text-align: center;
`;

export default function StatusBanner({ cooldown }) {
  const [isLiked, setLiked] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const hasCooldown = Boolean(cooldown?.cooldownUntil);

  const durationSec = hasCooldown
    ? Math.max(0, Math.floor((cooldown.cooldownUntil - now) / 1000))
    : 0;

  const label =
    cooldown?.cooldownType === "reuse"
      ? "Send with the same mail again in"
      : cooldown?.cooldownType === "daily"
      ? "Send again in"
      : "Ready to send";

  return (
    <FadeIn>
      <div className="mt-8 justify-around text-green-700 md:pr-15 md:pl-15 rounded-xl text-sm font-medium flex items-center gap-15">
        <Block>
          <BiMailSend className="text-4xl" />
          <H4>{256}</H4>
          <H4>Contacts</H4>
        </Block>

        <div className="flex items-center justify-around flex-col w-full">
          <br className="mt-20" />
          {hasCooldown && (
            <PieTimer
              durationSec={durationSec}
              size={70}
              onComplete={() =>
                toast.custom((t) => (
                  <PopUp
                    t={t}
                    message={
                      cooldown?.cooldownType === "reuse"
                        ? "Ready to send using the same email."
                        : "Daily limit reset."
                    }
                  />
                ))
              }
            />
          )}

          <br className="mt-20" />
          <H4>{label}</H4>
        </div>

        <Block>
          {isLiked ? (
            <FaHeart
              className="text-red-700 text-4xl cursor-pointer"
              onClick={() => setLiked(false)}
            />
          ) : (
            <FaRegHeart
              className="text-red-700 text-4xl cursor-pointer"
              onClick={() => setLiked(true)}
            />
          )}
          <H4>{256}</H4>
          <H4>Likes</H4>
        </Block>
      </div>
    </FadeIn>
  );
}
