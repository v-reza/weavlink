import { createContext, useReducer } from "react";
import NotificationReducer from "../reducer/NotificationReducer";

const INITAL_STATE = {
  isNotification: false,
  title: "",
  isError: false,
  message: "",
};

export const NotificationContext = createContext(INITAL_STATE);

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, INITAL_STATE);

  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
