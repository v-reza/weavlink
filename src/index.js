import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./Theme/ThemeContext";
import Theme from "./Theme/Theme";
import ThemeToggle from "./Theme/ThemeToggle";
import { AuthContextProvider } from "./redux/context/UserContext";
import { NotificationContextProvider } from "./redux/context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationContextProvider>
        <ThemeProvider>
          <Theme>
            <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
              <ThemeToggle />
            </div>
            <App />
          </Theme>
        </ThemeProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
