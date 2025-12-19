import styled from "styled-components";
import FadeIn from "../../animation-ui/FadeIn";
import { BiMailSend } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsFillPeopleFill, BsPeople } from "react-icons/bs";
import { PiClockCounterClockwise } from "react-icons/pi";
import { useState } from "react";

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
const H4 = styled.h4``;
export default function StatusBanner() {
  const [isLiked, setLiked] = useState(false);
  const likes = 256;
  const views = 1024;
  const submissions = 128;
  const timeOnCounter = "3h 45m";
  return (
    <FadeIn>
      <div className="mt-8  text-green-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
        {/* <span className="bg-green-500 w-3 h-3 rounded-full inline-block"></span> */}
        <Block>
          <BiMailSend className="text-4xl" />
          <h4>Contacts</h4>
        </Block>
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
          <h4>
            {likes}
            <br />
            likes
          </h4>
        </Block>
        <Block>
          <BsFillPeopleFill />
          <BsPeople />
          <h4>Views!</h4>
        </Block>

        <Block>
          <PiClockCounterClockwise />
          <h4>Time on counter</h4>
        </Block>
      </div>
    </FadeIn>
  );
}
