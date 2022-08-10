import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { ThemeContext } from "./ThemeContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={classNames(
        isAuthenticated ? "hidden" : "block",
        "transition duration-500 ease-in-out rounded-full -py-3 top-0"
      )}
    >
      {theme === "dark" ? (
        <FaSun
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      ) : (
        <FaMoon
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
