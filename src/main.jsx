import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/global.css";
import { UIProvider } from "./context/UIContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </StrictMode>
);
