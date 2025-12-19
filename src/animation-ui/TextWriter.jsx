import Typewriter from "typewriter-effect";

function TextWriter({ arrayOfTexts }) {
  return (
    <Typewriter
      options={{
        strings: arrayOfTexts || [
          "Ahmed Tharwat",
          "Web Developer",
          "Frontend Developer",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
}

export default TextWriter;
