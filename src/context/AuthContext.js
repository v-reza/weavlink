import { createContext, useEffect, useReducer } from "react";
import { axiosGet } from "@/api";
import AuthReducer from "@/context/AuthReducer";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

const INITAL_STATE = {
  token:
    (typeof window !== "undefined" && localStorage.getItem("token")) || null,
  isAuthenticated:
    typeof window !== "undefined" && localStorage.getItem("token") === "null"
      ? false
      : true,
  isLoading: false,
  error: false,
  isGoogleSetPassword: false,
  googleSetUser: null,
};

export const AuthContext = createContext(INITAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITAL_STATE);
  const { user, dispatch: dispatchUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const saveState = async () => {
      if (!state.isGoogleSetPassword) {
        new Promise((resolve, reject) => {
          localStorage.setItem("token", state.token);
        })
          .then(() => {
            resolve(
              localStorage.setItem(
                "isAuthenticated",
                localStorage.getItem("token") === "null" ? false : true
              )
            );
          })
          .catch((err) => reject(err));
          
        if (state.isAuthenticated && state.token !== "null") {
          try {
            await axiosGet("/checkToken", {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            }).then((res) => {
              dispatchUser({
                type: "SET_USER",
                payload: res.data.users,
              });
            });
          } catch (error) {
            dispatch({ type: "LOGOUT" });
            dispatchUser({ type: "SET_USER", payload: null });
            router.push("/auth/login");
          }
        }
      }
    };
    saveState();
  }, [state.isGoogleSetPassword, state.token, state.isAuthenticated, router]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
