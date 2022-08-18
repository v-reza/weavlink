import React from "react";
import App from "./App";
import { LoadingContextProvider } from "./redux/context/LoadingContext";
import { NotificationContextProvider } from "./redux/context/NotificationContext";
import { AuthContextProvider } from "./redux/context/UserContext";
import Theme from "./Theme/Theme";
import { ThemeProvider } from "./Theme/ThemeContext";
import ThemeToggle from "./Theme/ThemeToggle";

const Main = () => {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <LoadingContextProvider>
          <ThemeProvider>
            <Theme>
              <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
                <ThemeToggle />
              </div>
              <App />
            </Theme>
          </ThemeProvider>
        </LoadingContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
};

export default Main;
