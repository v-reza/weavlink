import { createContext, useEffect, useReducer } from "react";
import { axiosGet } from "../../helper/axiosHelper";
import UserReducer from "../reducer/UserReducer";

const INITAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: JSON.parse(localStorage.getItem("user")) ? true : false,
  isLoading: false,
  error: false,
};

export const UserContext = createContext(INITAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITAL_STATE);

  useEffect(() => {
    const saveState = async () => {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
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
    };

    saveState();
  }, [state.token, state.user]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
