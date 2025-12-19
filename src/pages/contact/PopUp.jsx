import styled from "styled-components";
import { useThemeContext } from "../../hooks/useThemeContext";
import Jump from "../../animation-ui/Jump";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: ${({ theme }) => (theme == "dark" ? "#fff" : "#111827")};
  border-radius: 20px;
  border: 1px solid #333;
  padding: 5px 10px;
  width: 400px;
`;

function PopUp({ message, t, customLink = false, link }) {
  const { theme } = useThemeContext();

  return (
    <Container theme={theme}>
      <button
        onClick={() => toast.dismiss(t?.id)}
        className="absolute top-0 -left-5 text-2xl bg-inherit border-2  cursor-pointer "
        aria-label="Close notification"
      >
        <IoClose
          size={18}
          className={`${theme !== "dark" ? "text-white" : "text-black"}`}
        />
      </button>
      <img
        src={
          theme !== "dark"
            ? `../../../public/darkmodelogo.png`
            : `../../../public/lightmodelogo.png`
        }
        className="w-15 h-15"
      />
      <div>
        <h3
          className={`${
            theme !== "dark" ? "text-white!" : "text-black!"
          } text-sm font-extrabold`}
        >
          {message}
        </h3>
        {customLink && (
          <Jump>
            <a
              href={"https://mail.google.com/mail/u/0/#inbox"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 font-extrabold text-center"
            >
              Open Gmail
            </a>
          </Jump>
        )}
      </div>
    </Container>
  );
}

export default PopUp;
