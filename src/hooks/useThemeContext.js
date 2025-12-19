import { createContext, useContext } from "react";

// 1. Export the Context object
export const ThemeContext = createContext({
  // Define the structure for better autocomplete/defaults
  theme: localStorage.getItem("theme") || "dark",
  toggleThemeFunction: () => {},
});
export const useThemeContext = () => {
  return useContext(ThemeContext);
};
