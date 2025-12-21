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

export default function StatusBanner({ cooldown, remaining, refreshTrigger }) {
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCooldownUntil, setLikeCooldownUntil] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Update clock every second
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch stats on mount and when refreshTrigger changes
  useEffect(() => {
    fetchContactStats();
    fetchLikeStatus();
  }, [refreshTrigger]);

  const fetchContactStats = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_CONTACT_STATS_FUNCTION_URL, {
        method: "GET",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      const data = await res.json();
      setTotalContacts(data.totalContacts);
    } catch (err) {
      console.error("Failed to fetch contact stats:", err);
    }
  };

  const fetchLikeStatus = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_LIKE_STATUS_FUNCTION_URL, {
        method: "GET",
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      const data = await res.json();
      setTotalLikes(data.totalLikes);
      setHasLiked(data.hasLiked);
      setLikeCooldownUntil(data.cooldownUntil);
    } catch (err) {
      console.error("Failed to fetch like status:", err);
    }
  };

  const handleLike = async () => {
    if (likeLoading || hasLiked) return;

    try {
      setLikeLoading(true);

      const res = await fetch(import.meta.env.VITE_LIKE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      const data = await res.json();

      if (res.status === 429) {
        toast.custom((t) => (
          <PopUp t={t} message="You can like again tomorrow!" />
        ));
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to like");
      }

      // Update state
      setTotalLikes(data.totalLikes);
      setHasLiked(true);
      setLikeCooldownUntil(Date.now() + 24 * 60 * 60 * 1000);

      toast.custom((t) => <PopUp t={t} message="Thanks for the like! ❤️" />);
    } catch (err) {
      console.error(err);
      toast.custom((t) => (
        <PopUp t={t} message="Something went wrong. Please try again." />
      ));
    } finally {
      setLikeLoading(false);
    }
  };

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
          <H4>{totalContacts}</H4>
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
          <div
            onClick={handleLike}
            style={{
              cursor: hasLiked || likeLoading ? "not-allowed" : "pointer",
              opacity: likeLoading ? 0.6 : 1,
            }}
          >
            {hasLiked ? (
              <FaHeart className="text-red-700 text-4xl" />
            ) : (
              <FaRegHeart className="text-red-700 text-4xl" />
            )}
          </div>
          <H4>{totalLikes}</H4>
          <H4>Likes</H4>
        </Block>
      </div>
    </FadeIn>
  );
}
