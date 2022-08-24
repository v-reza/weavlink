import { createContext, useEffect, useReducer } from "react";
import { axiosGet } from "../../helper/axiosHelper";
import {
  parseToJson,
  cryptoSecureStorage,
} from "../../middleware/secureStorage";
import UserReducer from "../reducer/UserReducer";
const INITAL_STATE = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  user:
    localStorage.getItem("user") === "null" ||
    localStorage.getItem("user") === null
      ? null
      : parseToJson(
          localStorage.getItem("user"),
          localStorage.getItem("token")
        ),
  token: localStorage.getItem("token") || null,
  isAuthenticated:
    localStorage.getItem("token") === "null" ||
    localStorage.getItem("token") === null
      ? false
      : true,
  isLoading: false,
  error: false,
  isGoogleSetPassword: false,
  googleSetUser: null,
  isNewCompany: false,
  dataNewCompany: null,
};

export const UserContext = createContext(INITAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITAL_STATE);

  useEffect(() => {
    const saveState = async () => {
      if (!state.isGoogleSetPassword) {
        /* Middleware  */
        const hash = cryptoSecureStorage(state.user, state.token);
        localStorage.setItem("user", hash);
        localStorage.setItem("token", state.token);
        /* End Middleware */
        if (state.user && state.token) {
          try {
            await axiosGet("/checkToken", {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            });
          } catch (error) {
            dispatch({ type: "LOGOUT" });
            window.location.reload();
          }
        }
      }
    };
    saveState();
  }, [state.isGoogleSetPassword, state.token, state.user]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
