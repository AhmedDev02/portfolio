import { useThemeContext } from "../hooks/useThemeContext";

function DarkModeToggle({ isDarkMode, toggleDarkMode, classStyles = "" }) {
  const { toggleThemeFunction } = useThemeContext();
  return (
    <label
      htmlFor="theme-toggle"
      className={`${classStyles} flex items-center cursor-pointer`}
    >
      <div className="relative">
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only" // screen reader only to hide the default input
          checked={isDarkMode}
          onClick={toggleThemeFunction}
          onChange={toggleDarkMode}
        />

        {/* Track */}
        <div
          className={`
            block w-14 h-8 rounded-full border-2 transition-colors duration-300
            ${
              isDarkMode
                ? "bg-indigo-500 dark:bg-white border-indigo-500 dark:border-white  "
                : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            }
          `}
        ></div>

        {/* Slider (The circle that moves) */}
        <div
          className={`
            absolute left-1 top-1 w-6 h-6 rounded-full shadow transition-transform duration-300
            ${
              isDarkMode
                ? "translate-x-6 bg-yellow-400"
                : "translate-x-0 bg-white"
            }
          `}
        >
          {/* Sun/Moon Icon (Lucide SVG Icons) */}
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Sun Icon (Visible in Light Mode) */}
            <svg
              className={`w-4 h-4 text-yellow-500 absolute transition-opacity duration-300 ${
                isDarkMode ? "opacity-0" : "opacity-100"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M4.93 19.07l1.41-1.41" />
              <path d="M17.66 6.34l1.41-1.41" />
            </svg>
            {/* Moon Icon (Visible in Dark Mode) */}
            <svg
              className={`w-4 h-4 text-white absolute transition-opacity duration-300 ${
                isDarkMode ? "opacity-100" : "opacity-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        </div>
      </div>
    </label>
  );
}
export default DarkModeToggle;
