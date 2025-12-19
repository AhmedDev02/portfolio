import styled from "styled-components";

const LoaderRing = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${(props) => props.color || "#00944a"};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
function LoaderSpinning({ color = "#00944a" }) {
  return (
    <button>
      <LoaderRing color={color} />
    </button>
  );
}

export default LoaderSpinning;
