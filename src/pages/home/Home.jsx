import FadeLeftToRight from "../../animation-ui/FadeLeftToRight";
import TextWriter from "../../animation-ui/TextWriter";
import Hero from "./Hero";
import Jump from "../../animation-ui/Jump";

function Home() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row w-full mb-0">
        <div className="flex flex-col p-5 mr-10 md:ml-20 justify-center w-full md:max-w-1/2">
          <FadeLeftToRight delay={0.4}>
            <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-6xl font-extrabold dark:text-amber-100">
              <TextWriter
                className="home-text"
                arrayOfTexts={["Front-End", "React"]}
              />
              <hr className="mt-5 w-0" />
              Developer
            </h1>
          </FadeLeftToRight>

          <br />
          <FadeLeftToRight delay={0.8}>
            <h2>
              Over{" "}
              <Jump>
                <span className="inline-block text-emerald-100 dark:text-emerald-900 bg-emerald-900 dark:bg-emerald-100">
                  three
                </span>
              </Jump>{" "}
              years of experience in creating efficient and high-performance web
              applications. My expertise lies in React.js and TypeScript, where
              I focus on delivering user-friendly and maintainable software
              solutions.
            </h2>
          </FadeLeftToRight>
        </div>
        <Hero />
      </div>
    </>
  );
}

export default Home;
