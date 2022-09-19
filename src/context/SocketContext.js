import { createContext, useEffect, useReducer } from "react";
import { axiosGet } from "@/api";
import { useRouter } from "next/router";
import SocketReducer from "./SocketReducer";
import { io } from "socket.io-client";
import useUser from "@/hooks/useUser";

const INITAL_STATE = {
  socket: null,
};

export const SocketContext = createContext(INITAL_STATE);

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, INITAL_STATE);
  const { user } = useUser();
  
  useEffect(() => {
    const server = process.env.NEXT_APP_SOCKET || "http://localhost:5000";
    const socket = io(server);
    socket.connect();
    socket.emit("addUser", user?._id);
    dispatch({ type: "SOCKET", socket });

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  // useEffect(() => {
  //   if (state.socket) {
  //     state.socket.on("getUsers", (data) => {
  //       console.log("getUsersFromContext => ", data);
  //     });
  //   }
  // }, [state.socket]);

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
