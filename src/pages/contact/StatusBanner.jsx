import styled from "styled-components";
import FadeIn from "../../animation-ui/FadeIn";
import { BiMailSend } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { memo, useEffect, useMemo, useState } from "react";
import PieTimer from "./PieTimer";
import toast from "react-hot-toast";
import PopUp from "./PopUp";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  /* font-size: 1.3rem; */
  margin-top: 2rem;
  /* background-color: #e6ffed; */
`;
const Span = styled.span``;
const H4 = styled.h4`
  text-align: center;
`;
export default function StatusBanner({ remaining, cooldown }) {
  const [isLiked, setLiked] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!cooldown?.cooldownUntil) return;

    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [cooldown?.cooldownUntil]);

  const durationSec = useMemo(() => {
    if (!cooldown?.cooldownUntil) return 0;
    return Math.max(0, Math.floor((cooldown.cooldownUntil - now) / 1000));
  }, [cooldown?.cooldownUntil, now]);

  const likes = 256;
  const contacts = 256;

  return (
    <FadeIn>
      <div className="mt-8 justify-around text-green-700 md:pr-15 md:pl-15  rounded-xl text-sm font-medium flex items-center gap-15">
        <Block>
          <BiMailSend className="text-4xl" />
          <H4>{contacts}</H4>
          <H4>Contacts</H4>
        </Block>
        <div className="flex items-center justify-around w-full  ">
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
          <H4>
            {cooldown?.cooldownType === "reuse"
              ? "Send with the same mail again in"
              : "Send again in"}
          </H4>
        </div>
        <Block>
          {isLiked ? (
            <FaHeart
              className="text-red-700 text-4xl"
              onClick={() => setLiked(false)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaRegHeart
              className="text-red-700 text-4xl"
              onClick={() => setLiked(true)}
              style={{ cursor: "pointer" }}
            />
          )}
          <H4>{likes}</H4>

          <H4>likes</H4>
        </Block>
      </div>
    </FadeIn>
  );
}
