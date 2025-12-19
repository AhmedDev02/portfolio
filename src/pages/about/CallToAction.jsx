import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Button = styled.a`
  background-color: #009966;
  color: white;
  border-radius: 18px;
  cursor: pointer;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 100%;
  height: 60px;
  text-decoration: none;
  border: none;
  margin-top: auto;

  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

function CallToAction({
  name,
  icon: Icon,
  link,
  download = false,
  internal = false,
}) {
  // 🔹 Internal navigation (NavLink)
  if (internal) {
    return (
      <Button as={NavLink} to={link}>
        {Icon && <Icon size={22} />}
        {name}
      </Button>
    );
  }

  // 🔹 Download or external link
  return (
    <Button
      href={link}
      download={download ? "" : undefined}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noopener noreferrer"}
    >
      {Icon && <Icon size={22} />}
      {name}
    </Button>
  );
}

export default CallToAction;
