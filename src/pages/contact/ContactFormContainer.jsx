import styled from "styled-components";
import ContactForm from "./ContactForm";
import Jump from "../../animation-ui/Jump";

import ContactHub from "./ContactHub";
import PopOutDiv from "../../animation-ui/PopOutDiv";
import FadeRightToLeft from "../../animation-ui/FadeRightToLeft";
import Counter from "./Counter";

const H1 = styled.h1`
  font-size: 24px;
  text-align: center;
`;
const Span = styled.span`
  background: linear-gradient(120deg, #fff8a6 30%, #ffe86b 70%);
  border-radius: 4px;
  padding: 0 0.4em;
  display: inline-block;
  margin: 0 10px;
  font-weight: 800;
`;

function ContactFormContainer() {
  return (
    <>
      <div className="flex flex-col gap-2.5 pt-10 z-2">
        <H1 className="z-10">
          Have an
          <PopOutDiv className="md:inline-block z-2">
            <Jump>
              <Span className="dark:text-emerald-900 z-2">IDEA?</Span>
            </Jump>
          </PopOutDiv>
        </H1>
        <H1 className="z-10">
          Let's turn it into
          <PopOutDiv className="md:inline-block z-2">
            <Jump>
              <Span className="dark:text-emerald-900 z-2">REAlITY</Span>
            </Jump>
          </PopOutDiv>
        </H1>
      </div>
      <FadeRightToLeft delay={0}>
        <ContactHub />
      </FadeRightToLeft>
    </>
  );
}

export default ContactFormContainer;
