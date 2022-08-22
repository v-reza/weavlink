import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { AuthContextProvider } from "./redux/context/UserContext";
import { store } from "./redux/store";
import Theme from "./Theme/Theme";
import { ThemeProvider } from "./Theme/ThemeContext";
import ThemeToggle from "./Theme/ThemeToggle";

const Main = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <ThemeProvider>
          <Theme>
            <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
              <ThemeToggle />
            </div>
            <App />
          </Theme>
        </ThemeProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default Main;
