import { createContext, useEffect, useReducer } from "react";
import { axiosGet } from "@/api";
import { useRouter } from "next/router";
import SocketReducer from "./SocketReducer";
import { io } from "socket.io-client";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const INITAL_STATE = {
  socket: null,
};

export const SocketContext = createContext(INITAL_STATE);

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, INITAL_STATE);
  const { user } = useUser();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const server = process.env.NEXT_APP_SOCKET || "http://localhost:5000";
    const socket = io(server);
    if (isAuthenticated) {
      socket.connect();
      socket.emit("addUser", user?._id);
      dispatch({ type: "SOCKET", socket });
      return () => {
        socket.disconnect();
      };
    }
  }, [isAuthenticated, user?._id]);

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
