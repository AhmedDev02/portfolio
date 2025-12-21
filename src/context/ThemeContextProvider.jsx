import { useState } from "react";
import { ThemeContext } from "../hooks/useThemeContext";

// 2. The Provider Component
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleThemeFunction = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const contextValue = { theme, toggleThemeFunction };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeContextProvider;
